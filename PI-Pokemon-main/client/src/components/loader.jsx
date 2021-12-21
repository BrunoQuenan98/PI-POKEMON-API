import React from "react";
import pikachu from "./pikachu.gif"
import s from "./loader.module.css"

export const Loader = () =>{

    return(<div className={s.conteiner}>
        <img className={s.gif} src={pikachu} alt="gif"/>
        <span className={s.texto}>Cargando...</span>
    </div>)


}