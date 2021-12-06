import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getPokemonDetail, cleanPokemonDetail } from "../redux/actions/actions";


export const Detail = () =>{

    
    const dispatch = useDispatch();
    const id = useParams();

    console.log(id.id);

    useEffect(()=>{
        dispatch(getPokemonDetail(id.id))
        return () => dispatch(cleanPokemonDetail())
    },[dispatch])


    const detail = useSelector(state => state.pokemonDetail);
    console.log(detail);

    return(
        <div>
            <h1>{detail?.name}</h1>
            <img src={detail?.img} alt='img pokemon'/>
            <div>
            <h3>Stats</h3>
            <h5>Vida:{detail?.vida}</h5>
            <h5>Fuerza:{detail?.fuerza}</h5>
            <h5>Defensa:{detail?.defensa}</h5>
            <h5>Velocidad:{detail?.velocidad}</h5>
            <h3>Dimensions</h3>
            <h5>{detail?.altura}</h5>
            <h5>{detail?.peso}</h5>
            <h3>Tipo</h3>
            {detail?.type?.map((tipo, i) => <h5 key={i}>{tipo}</h5>)}
            </div>
        </div>
    )

}