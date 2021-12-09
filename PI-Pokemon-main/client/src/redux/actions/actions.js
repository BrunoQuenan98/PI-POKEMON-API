import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_TYPES, SELECT_TYPE, FILTER_POKEMON_TYPE, FILTER_POKEMON_ORIGIN } from "./consts";
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

export function filterPokemonType(payload){
    return{
        type: FILTER_POKEMON_TYPE,
        payload: payload
    }
}

export function filterPokemonOrigin(payload){
    return{
        type: FILTER_POKEMON_ORIGIN,
        payload: payload
    }
}


export function selectType(payload){
    return{
        type: SELECT_TYPE,
        payload: payload
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

export function getTypes(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/types')
        dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function cleanPokemonDetail(){
    return{
        type:CLEAN_POKEMON_DETAIL,
        payload:{}
    }
}