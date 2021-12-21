import React from "react";
import { Link } from "react-router-dom";
import s from "./card.module.css";

export const Card = (props) =>{
    let name =  props.name.split('').map((letra, i) => {
        if(i === 0)return letra.toUpperCase();
        return letra;     
    })
    let clase = props.type.length > 1 ? 'mixto' : props.type.join('-');
    console.log(clase);
    return(
        
        <div className={s.card}>
            <div className={s.imgDiv}>
            <img src={props.img} className={s.img} alt="img pokemon"/>
            </div>
            <div className={s.nameTypeCont}>
            <Link to={`/detail/${props.id}`} className={s.linkName}>
            <h1 className={s.name}>{name.join('')}</h1>
            </Link>
            <div className={s.tiposConteiner}>
                {props.type.map((tipo,i) => <span key={i} className={s.tipos}>{tipo}</span>)}
            </div>
            </div>
        </div>
    )

}