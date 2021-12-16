import React from "react";
import { Link } from "react-router-dom";
import logo from '../International_Pokémon_logo.svg';
import s from '../components/landing.module.css'

export const Landing = () =>{

    return(
        <>
        <img className={s.imgFondo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="img fondo" />
        <Link to="/home">
        <button className={s.btn}>Comencemos!</button>
        </Link>
        </>
    )


}