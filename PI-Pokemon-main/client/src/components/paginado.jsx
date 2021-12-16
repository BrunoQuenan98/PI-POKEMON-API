import React from "react";
import s from "./paginado.module.css";

export const Paginado = ({pokemonsPerPage, allPokemons, paginado}) =>{

    const pageNumbers = []
    //allPokemons / pokemonsPerPage
    for (let i = 0; i < Math.ceil(allPokemons/ pokemonsPerPage); i++) {
        pageNumbers.push(i + 2)
    }
    return(
        <>
         <ul className={s.lista}>
            <li><button onClick={(e) => paginado(1)} className={s.btn}>1</button></li>
            {pageNumbers?.map(el => <li key={el}><button className={s.btn} onClick={(e) => paginado(el)}>{el}</button></li>)}
        </ul> 
        </>
    )

}