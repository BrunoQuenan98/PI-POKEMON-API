import React from "react";
import { Card } from "./card.jsx"

export const Cards = ({pokemones}) =>{

    return(
        <>
        
        {pokemones?.map(pokemon => {
            return <Card id={pokemon.id} img={pokemon.img} name={pokemon.name} key={pokemon.id}/>
        })}
        </>
    )


}