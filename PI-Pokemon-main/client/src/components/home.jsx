import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemones, getTypes, filterPokemonType, filterPokemonOrigin, orderByName, orderByStrength, cleanFilters } from "../redux/actions/actions.js"
import { Cards } from "./cards.jsx";
import { Paginado } from "./paginado.jsx";
export const Home = () =>{

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const pokemones = useSelector(state => state.pokemones);
    const pokemonesFiltered = useSelector(state => state.pokemonesFiltered);
    const [filter, setFilter] = useState(false);
    const [pokemonesRender, setPokemonesRender] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(9);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    let currentPokemon = []
    var allPokemons = [];

    
    if(filter === false){
        allPokemons = pokemonesRender.pokemones ? pokemonesRender.pokemones : []
        currentPokemon = pokemonesRender.pokemones?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    }else if(pokemonesFiltered.length > 0){
        allPokemons = pokemonesRender.pokemonesFiltered ? pokemonesRender.pokemonesFiltered : []
        currentPokemon = pokemonesRender.pokemonesFiltered?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    }else{
        allPokemons = pokemonesRender.pokemones ? pokemonesRender.pokemones : []
        currentPokemon = pokemonesRender.pokemones?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    }
    

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemones());
        dispatch(getTypes());
        return () =>{
            dispatch(cleanFilters());
        }
       }, [dispatch]);

     useEffect(()=>{
         setPokemonesRender({pokemones, pokemonesFiltered})
     },[pokemones, pokemonesFiltered])   
       
    

    function handleFilter(e){
        e.preventDefault();
        dispatch(filterPokemonOrigin(e.target.origen.value));
        dispatch(filterPokemonType(e.target.type.value));
        setFilter(true)
    }

     function handleOrderName(e){
         dispatch(orderByName(e.target.value));
         setPokemonesRender({pokemones, pokemonesFiltered});
    }

    function handleOrderStrength(e){
        dispatch(orderByStrength(e.target.value));
        setPokemonesRender({pokemones, pokemonesFiltered});
    }

  
    
    
    const validatePokemonsForCards = () => {
        
        if(filter === true && pokemonesFiltered.length === 0){
            return(<>
            <span style={{color : 'red'}}>No se han encontrado pokemones con los filtros seleccionados</span>
            <Cards pokemones={currentPokemon}/>
            </>)
        }else if(filter === true && pokemonesFiltered.length > 0){
            return(<>
                <Cards pokemones={currentPokemon}/>
                </>)
        }else{
            return(<>
                <Cards pokemones={currentPokemon}/>
                </>)
        }
        
    }

    return(
        <>
        <Link to='/create'>
            <button>Crear Pokemon</button>
        </Link>
        <label>Filtrar por Origen:</label>
        <form onSubmit={(e) => handleFilter(e)}>
        <select name="origen" id="origen">
            <option value='todos'>Todos</option>
            <option value='api'>Pokemones API</option>
            <option value='bd'>Pokemones BD</option>
        </select>
        <label>Filtrar por Tipo:</label>
        <select name="type" id="type">
            <option value='todosTipo'>Todos</option>
            {types?.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}
        </select>
        <input type='submit' value='filtrar'/>
        </form>
        <label>Ordenar por Fuerza:</label>
        <select name="fuerza" id="fuerza" onChange={(e) => handleOrderStrength(e)}>
            <option value='asc'>Ascendente</option>
            <option value='dsc'>Descendente</option>
        </select>
        <label>Ordenar por Nombre:</label>
        <select name="nombre" id="nombre" onChange={(e) => handleOrderName(e)}>
            <option value='asc'>Ascendente</option>
            <option value='dsc'>Descendente</option>
        </select>
        {allPokemons.length && <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>}
        
        {validatePokemonsForCards()}
        </>
    )   
}