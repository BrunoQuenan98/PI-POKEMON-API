import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_TYPES, SELECT_TYPE, FILTER_POKEMON_TYPE, FILTER_POKEMON_ORIGIN } from "../actions/consts";


const initialState = {
    pokemones : [],
    pokemonDetail : {},
    types: [],
    pokemonesFilteredType : [],
    pokemonesFilteredOrigin : [],
    pokemonesFiltered : []
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
                pokemonesFiltered : state.pokemonesFilteredOrigin.length ? joinFilters : pokemonesByType,
            }
        case FILTER_POKEMON_ORIGIN:
            let pokemonesByOrigin = action.payload === 'api' ? state.pokemones.filter(pokemon => Number.isInteger(Number(pokemon.id))) : state.pokemones.filter(pokemon => !Number.isInteger(Number(pokemon.id)));
            pokemonesByOrigin = action.payload === 'todos' ? state.pokemones : pokemonesByOrigin;
            let joinFilterss = [];
            if(state.pokemonesFilteredType.length > 0){
                for (let i = 0; i < state.pokemonesFilteredOrigin.length; i++) {
                    for (let j = 0; j < pokemonesByOrigin.length; j++) {
                        if(state.pokemonesFilteredOrigin[i] === pokemonesByOrigin[j]){
                            joinFilterss.push(pokemonesByOrigin[j])
                            break
                        }
                    }   
                }
            }    
            return{
                ...state,
                pokemonesFilteredOrigin : pokemonesByOrigin,
                pokemonesFiltered : state.pokemonesFilteredType.length ? joinFilterss : pokemonesByOrigin,
            }              
        default: return state;    
    }
}