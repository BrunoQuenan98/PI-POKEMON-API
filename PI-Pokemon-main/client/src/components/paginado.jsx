import React from "react";


export const Paginado = ({pokemonsPerPage, allPokemons, paginado}) =>{

    const pageNumbers = []
    //allPokemons / pokemonsPerPage
    for (let i = 0; i < Math.ceil(allPokemons/ pokemonsPerPage); i++) {
        pageNumbers.push(i + 2)
    }
    return(
        <>
         <ul>
            <li><button onClick={(e) => paginado(1)}>1</button></li>
            {pageNumbers?.map(el => <li key={el}><button onClick={(e) => paginado(el)}>{el}</button></li>)}
        </ul> 
        </>
    )

}