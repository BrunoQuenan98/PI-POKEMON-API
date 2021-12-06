import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_TYPES, SELECT_TYPE, POST_POKEMON } from "../actions/consts";


const initialState = {
    pokemones : [],
    pokemonDetail : {},
    types: []
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
        case POST_POKEMON:
            return{
                ...state,
                pokemones:[...state.pokemones, action.payload]
            }                      
        default: return state;    
    }
}