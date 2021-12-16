import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from '../redux/actions/actions.js';
import s from "./searchBar.module.css";

export const SearchBar = ({setFilter}) =>{

    const dispatch = useDispatch();
    const [input, setInput] = useState({name : ''})

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchPokemon(e.target.busqueda.value))
        setFilter(false);
    }

    function handleChange(e){
        setInput({...input, name: e.target.value})
    }


    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='text' name='busqueda' onChange={(e) => handleChange(e)} className={s.buscador}/>
                <input type='submit' value='Buscar' className={s.btn} disabled={input.name !== '' ? false : true}/>
            </form>
        </div>
    )



}