const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js'
const axios = require('axios');
const { Pokemon, Tipo } = require('../db.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function pokemonsApi(){
    let PokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let pokemones = PokemonsApi.data.results
    pokemones = await Promise.all(pokemones.map (async (pokemon) =>{
        let dataPokemon = await axios.get(`${pokemon.url}`);
        let imgPokemon = await axios.get(`${dataPokemon.data.forms[0].url}`);
        return {
            id: pokemon.url.split('/')[6],
            name : pokemon.name,
            vida : dataPokemon.data.stats[0].base_stat,
            fuerza : dataPokemon.data.stats[1].base_stat,
            defensa :dataPokemon.data.stats[2].base_stat,
            velocidad :dataPokemon.data.stats[5].base_stat,
            altura :dataPokemon.data.height,
            peso :dataPokemon.data.weight,
            img : imgPokemon.data.sprites.front_default,
            type :dataPokemon.data.types.map(tipo => tipo.type.name),
        }
    })
    )

    return pokemones;
}

router.get('/pokemons', async (req, res)=>{
    const { name } = req.query;

    if(name){
        try{
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        pokemon = {
            id: pokemon.data.id,
            name : pokemon.data.name,
            vida : pokemon.data.stats[0].base_stat,
            fuerza : pokemon.data.stats[1].base_stat,
            defensa :pokemon.data.stats[2].base_stat,
            velocidad : pokemon.data.stats[5].base_stat,
            altura :pokemon.data.height,
            peso :pokemon.data.weight,
            img : pokemon.data.sprites.front_default,
            type : pokemon.data.types.map(tipo => tipo.type.name),
        }
        return res.json(pokemon)
    }catch(e){
        return res.json('NOMBRE INVALIDO')
    }
        
    }else{
        let pokemones =  await pokemonsApi();
        pokemones = pokemones.concat( await Pokemon.findAll({include: {
            model: Tipo,
           }}));
        res.json(pokemones);   
    }


   

   // name?res.json(pokemones.filter(pokemon => pokemon.name == name)):res.json(pokemones)
       
})

router.get('/types', async(req,res) =>{

    let types = await Tipo.findAll();
    if(types.length > 0) return res.json(types);
    let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    typesApi = await Promise.all(typesApi.data.results.map(async (tipo) => {
         let tipe = await Tipo.create({name:tipo.name})
         return tipe;
    }));

    return res.json(typesApi);

})

router.get('/pokemons/:id', async(req, res) =>{
    const { id } = req.params;
    if(id){
        let idInt = Number(id);
        if(Number.isInteger(idInt)){
            let pokemones = await pokemonsApi();
            let pokemon = pokemones.find(e => e.id == idInt)
            if(pokemon) return res.json(pokemon)
        }else{
            let pokemon = await Pokemon.findByPk(id,{include: {
                model: Tipo,
               }})
            if(pokemon) return res.json(pokemon)
        }
       
        return res.status(404).json('EL ID INGRESADO NO COINCIDE CON NINGUN POKEMON')
    }
})

router.post('/pokemons', async (req, res) =>{
    const {name, vida, fuerza, defensa, velocidad, altura, peso, img, types} = req.body

    console.log(req.body);
    
    if(name&&vida&&fuerza&&defensa&&velocidad&&altura&&peso&&img&&types){
        if(Array.isArray(types)){
            var tipo = await Promise.all(types.map(async tipos => await Tipo.findAll({where:{name: tipos}})))
            tipo = tipo.flat();
        }else{
            var [tipo, creada] = await Tipo.findOrCreate({where:{name: types}})
        }
        let pokemon = await Pokemon.create({
            name, 
            vida, 
            fuerza, 
            defensa, 
            velocidad, 
            altura, 
            peso, 
            img
        })
        await pokemon.setTipos(tipo);
        return res.json(pokemon);
    }
    return res.status(400).json('ups algo ha sucedido mal');
    
})

module.exports = router;
