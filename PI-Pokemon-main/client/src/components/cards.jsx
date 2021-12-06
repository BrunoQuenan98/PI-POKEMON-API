import React from "react";
import { useSelector } from "react-redux";
import { Card } from "./card.jsx"

export const Cards = () =>{

    const pokemones = useSelector(state => state.pokemones)

    return(
        <>
        {pokemones.map(pokemon => {
            return <Card id={pokemon.id} img={pokemon.img} name={pokemon.name} key={pokemon.name}/>
        })}
        </>
    )


}