import { GET_POKEMONES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_TYPES, SELECT_TYPE, FILTER_POKEMON_TYPE, FILTER_POKEMON_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH, CLEAN_FILTERS, SEARCH_POKEMON, CLEAN_SEARCH_POKEMON } from "./consts";
import axios from 'axios';

export function cleanFilters(){
    return{
        type:CLEAN_FILTERS,
        payload:[]
    }

}

export function cleanSearchPokemon(){
    return{
        type:CLEAN_SEARCH_POKEMON,
        payload:[]
    }

}

export function searchPokemon(payload){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/pokemons?name=${payload}`)
        console.log(json.data);
        return dispatch({
            type: SEARCH_POKEMON,
            payload: json.data
        })
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function orderByStrength(payload){
    return{
        type: ORDER_BY_STRENGTH,
        payload: payload
    }
}


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