import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_TYPES, SELECT_TYPE, FILTER_POKEMON_TYPE, FILTER_POKEMON_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH, CLEAN_FILTERS, SEARCH_POKEMON, CLEAN_SEARCH_POKEMON } from "../actions/consts";


const initialState = {
    pokemones : [],
    pokemonDetail : {},
    types: [],
    pokemonesFilteredType : [],
    pokemonesFilteredOrigin : [],
    pokemonesFiltered : [],
    pokemonesSearch : [],
}


export function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONES:
            return{
                ...state,
                pokemones : action.payload
                }
        case GET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case CLEAN_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case CLEAN_FILTERS:
            return{
                ...state,
                pokemonesFilteredType : action.payload,
                pokemonesFilteredOrigin : action.payload,
                pokemonesFiltered : action.payload
            }    
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case SELECT_TYPE:
            return{
                ...state,
                types: state.types.filter(tipo => tipo.name !== action.payload)
            } 
        case FILTER_POKEMON_TYPE:
          
            // eslint-disable-next-line array-callback-return
            let pokemonesByType = action.payload === 'todosTipo'? state.pokemones : state.pokemones.filter(pokemon =>{ 
                if(pokemon.tipos){
                    let tipos = pokemon.tipos.map(tiposPokemonBd => tiposPokemonBd.name)
                    if(tipos.includes(action.payload)){
                        return pokemon
                    }
                }else if(pokemon.type.includes(action.payload)){
                        return pokemon
                }
            })  
            let joinFilters = [];
            if(state.pokemonesFilteredOrigin.length > 0){
                for (let i = 0; i < state.pokemonesFilteredOrigin.length; i++) {
                    for (let j = 0; j < pokemonesByType.length; j++) {
                        if(state.pokemonesFilteredOrigin[i] === pokemonesByType[j]){
                            joinFilters.push(pokemonesByType[j])
                            break
                        }
                    }   
                }
            }    

            return{
                ...state,
                pokemonesFilteredType : pokemonesByType,
                pokemonesFiltered : state.pokemonesFilteredOrigin.length && pokemonesByType.length ? joinFilters : [],
            }
        case FILTER_POKEMON_ORIGIN:
            let pokemonesByOrigin = action.payload === 'api' ? state.pokemones.filter(pokemon => Number.isInteger(Number(pokemon.id))) : state.pokemones.filter(pokemon => !Number.isInteger(Number(pokemon.id)));
            pokemonesByOrigin = action.payload === 'todos' ? state.pokemones : pokemonesByOrigin;
            let joinFilterss = [];
            if(state.pokemonesFilteredType.length > 0){
                for (let i = 0; i < state.pokemonesFilteredType.length; i++) {
                    for (let j = 0; j < pokemonesByOrigin.length; j++) {
                        if(state.pokemonesFilteredType[i] === pokemonesByOrigin[j]){
                            joinFilterss.push(pokemonesByOrigin[j])
                            break
                        }
                    }   
                }
            }    
            return{
                ...state,
                pokemonesFilteredOrigin : pokemonesByOrigin,
                pokemonesFiltered : state.pokemonesFilteredType.length && pokemonesByOrigin.length ? joinFilterss : [],
            }
        case ORDER_BY_NAME:
           
            let pokemonesFilter = state.pokemonesFiltered?.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                if(action.payload === 'asc'){
                    return -1
                }else{
                    return 1
                }
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                if(action.payload === 'dsc'){
                    return -1
                }else{
                    return 1
                }
            }              
            return 0;
            });
            let pokemones = state.pokemones?.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    if(action.payload === 'asc'){
                        return -1
                    }else{
                        return 1
                    }
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    if(action.payload === 'dsc'){
                        return -1
                    }else{
                        return 1
                    }
                }       
                return 0;
                });
                console.log(pokemonesFilter)
            return {
                ...state,
                pokemonesFiltered: pokemonesFilter,
                pokemones : pokemones
            }
            case ORDER_BY_STRENGTH:
                let pokemons = state.pokemones.sort((a,b) => action.payload === 'asc' ? a.fuerza-b.fuerza : b.fuerza-a.fuerza);
                let pokemonsFilter = state.pokemonesFiltered.sort((a,b) => action.payload === 'asc' ? a.fuerza-b.fuerza : b.fuerza-a.fuerza);
            return {
                ...state,
                pokemonesFiltered: pokemonsFilter,
                pokemones: pokemons
            }
        case SEARCH_POKEMON:
            return{
                ...state,
                pokemonesSearch : action.payload
            }
        case CLEAN_SEARCH_POKEMON:
            return{
                ...state,
                pokemonesSearch : action.payload
            }                        
        default: return state;    
    }
}