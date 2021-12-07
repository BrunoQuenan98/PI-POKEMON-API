import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemones } from "../redux/actions/actions.js"
import { Cards } from "./cards.jsx"
export const Home = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemones());
       }, [dispatch]);

    return(
        <>
        <Link to='/create'>
            <button>Crear Pokemon</button>
        </Link>
        <input type='checkbox'/>
        <Cards/>
        </>
    )   
}