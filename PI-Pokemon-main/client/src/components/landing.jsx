import React from "react";
import { Link } from "react-router-dom";
import s from '../components/landing.module.css';
import pikachuLanding from "./pikachuLanding.gif"

export const Landing = () =>{

    return(
        <div className={s.conteiner}>    
        <Link to="/home">
        <div className={s.btn}></div>
        </Link>
    
        </div>
    )


}