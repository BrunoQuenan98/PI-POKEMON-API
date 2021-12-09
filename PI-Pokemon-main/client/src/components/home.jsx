import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemones, getTypes, filterPokemonType, filterPokemonOrigin } from "../redux/actions/actions.js"
import { Cards } from "./cards.jsx"
export const Home = () =>{

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const pokemones = useSelector(state => state.pokemones);
    const pokemonesFiltered = useSelector(state => state.pokemonesFiltered);

    useEffect(() => {
        dispatch(getPokemones());
        dispatch(getTypes());
        
       }, [dispatch]);
    

    function handleOrigen(e){
        dispatch(filterPokemonOrigin(e.target.value));
    }

    function handleType(e){
        dispatch(filterPokemonType(e.target.value));
    }
    
    const validatePokemonsForCards = (pokemones) => {
        return(<Cards pokemones={pokemones}/>)
    }

    return(
        <>
        <Link to='/create'>
            <button>Crear Pokemon</button>
        </Link>
        <label>Filtrar por Origen:</label>
        <select name="origen" id="origen" onChange={(e)=>handleOrigen(e)}>
            <option value='todos'>Todos</option>
            <option value='api'>Pokemones API</option>
            <option value='bd'>Pokemones BD</option>
        </select>
        <label>Filtrar por Tipo:</label>
        <select name="type" id="type" onChange={(e)=>handleType(e)}>
            <option value='todosTipo'>Todos</option>
            {types?.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}
        </select>
        <label>Ordenar por Fuerza:</label>
        <select name="fuerza" id="fuerza">
            <option value='asc'>Ascendente</option>
            <option value='dsc'>Descendente</option>
        </select>
        <label>Ordenar por Nombre:</label>
        <select name="nombre" id="nombre">
            <option value='asc'>Ascendente</option>
            <option value='dsc'>Descendente</option>
        </select>
        {pokemonesFiltered.length ? validatePokemonsForCards(pokemonesFiltered) : validatePokemonsForCards(pokemones)}
        </>
    )   
}