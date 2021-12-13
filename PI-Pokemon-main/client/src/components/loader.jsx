import React from "react";
import charmander from "../pokemon-charmander.gif"

export const Loader = () =>{

    return(<div>
        <img src={charmander} alt="gif"/>
        <span>Cargando...</span>
    </div>)


}