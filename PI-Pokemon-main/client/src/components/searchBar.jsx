import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from '../redux/actions/actions.js'


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
                <input type='text' name='busqueda' onChange={(e) => handleChange(e)}/>
                <input type='submit' value='Buscar' disabled={input.name !== '' ? false : true}/>
            </form>
        </div>
    )



}