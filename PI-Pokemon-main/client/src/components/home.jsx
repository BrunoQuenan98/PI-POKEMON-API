import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemones } from "../redux/actions/actions.js"
import { Cards } from "./cards.jsx"
export const Home = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemones());
       }, [dispatch]);

    return(
        <>
        <Cards/>
        </>
    )   
}