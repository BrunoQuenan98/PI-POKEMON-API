import React from "react";

export const Paginado = ({pokemonsPerPage, allPokemons, paginado}) =>{

    const pageNumbers = []
    //allPokemons / pokemonsPerPage
    for (let i = 1; i <= Math.ceil(allPokemons/ pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return(
        <ul>
            {pageNumbers?.map(el => <li key={el}><button onClick={(e) => paginado(el)}>{el}</button></li>)}
        </ul>
    )

}