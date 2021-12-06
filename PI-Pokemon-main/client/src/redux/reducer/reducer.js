import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL } from "../actions/consts";


const initialState = {
    pokemones : [],
    pokemonDetail : {}
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
        default: return state;    
    }
}