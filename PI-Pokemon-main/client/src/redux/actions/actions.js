import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL } from "./consts";
import axios from 'axios';

export function getPokemones(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_POKEMONES,
            payload: json.data
        }) 
    }
}

export function getPokemonDetail(payload){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/pokemons/${payload}`);
        return dispatch({
            type: GET_POKEMON_DETAIL,
            payload:json.data
        })
    }
}

export function cleanPokemonDetail(){
    return{
        type:CLEAN_POKEMON_DETAIL,
        payload:{}
    }
}