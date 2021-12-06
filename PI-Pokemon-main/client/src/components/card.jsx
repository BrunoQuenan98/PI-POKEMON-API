import React from "react";
import { Link } from "react-router-dom";


export const Card = (props) =>{
    
    return(
        <div>
            <Link to={`/detail/${props.id}`}>
            <h1>{props.name}</h1>
            </Link>
            <img src={props.img} alt="img pokemon"/>
        </div>
    )

}