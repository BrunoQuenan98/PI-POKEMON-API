import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getPokemonDetail, cleanPokemonDetail } from "../redux/actions/actions";
import { Loader } from "./loader";

export const Detail = () =>{

    
    const dispatch = useDispatch();
    const id = useParams();

  

    useEffect(()=>{
        dispatch(getPokemonDetail(id.id))
        return () => dispatch(cleanPokemonDetail())
    },[dispatch])


    const detail = useSelector(state => state.pokemonDetail);
    
    let tipos = []
    if(detail.type){ 
     tipos = detail.type.map((tipo, i) => <h5 key={i}>{tipo}</h5>) 
    }else if(detail.tipos){
    tipos = detail.tipos.map(tipo => <h5 key={tipo.id}>{tipo.name}</h5>)
    }
    return(
        <div>
            {tipos.length > 0 ? <>
            <h1>{detail?.name}</h1>
            <img src={detail?.img} alt='img pokemon'/>
            <div>
            <h3>Stats</h3>
            <h5>Vida:{detail?.vida}</h5>
            <h5>Fuerza:{detail?.fuerza}</h5>
            <h5>Defensa:{detail?.defensa}</h5>
            <h5>Velocidad:{detail?.velocidad}</h5>
            <h3>Dimensions</h3>
            <h5>Altura:{detail?.altura}</h5>
            <h5>Peso:{detail?.peso}</h5>
            <h3>Tipo</h3>
            {tipos}
            </div>
            </> : <Loader/>}
            <Link to='/home'>
                <span>Volver al Home</span>
            </Link>
        </div>
    )

}