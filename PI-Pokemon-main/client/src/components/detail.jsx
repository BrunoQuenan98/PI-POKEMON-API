import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getPokemonDetail, cleanPokemonDetail } from "../redux/actions/actions";
import { Loader } from "./loader";
import s from "./detail.module.css"

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
     tipos = detail.type.map((tipo, i) => <h5 className={s.tipo} key={i}>{tipo}</h5>) 
    }else if(detail.tipos){
    tipos = detail.tipos.map(tipo => <h5 className={s.tipo} key={tipo.id}>{tipo.name}</h5>)
    }
    return(
        <div className={s.conteiner}>
            {tipos.length > 0 ? <>
            
            <div className={s.cardConteiner}>
            <div className={s.home}>   
            <Link to='/home' className={s.exit}>
                <span className={s.exit}>Home</span>
            </Link>
            </div>     
            <div className={s.imgTitulo}>  
            <img  className={s.img} src={detail?.img} alt='img pokemon'/>
            <h1 className={s.titulo}>{detail?.name}</h1>
            </div>  
            <div>
            <h3 className={s.subtitulos}>Estadísticas</h3>
            <div className={s.statsConteiner}>

            <div className={s.statFlex}>  
            <span className={s.value}>{detail?.vida}</span> 
            <h5 className={s.stat}>Vida</h5>
            
            </div>

            <div className={s.statFlex}>
            <span className={s.value}>{detail?.fuerza}</span>
            <h5 className={s.stat}>Fuerza</h5>
            
            </div> 

            <div className={s.statFlex}>
            <span className={s.value}>{detail?.defensa}</span>
            <h5 className={s.stat}>Defensa</h5>
            
            </div> 

            <div className={s.statFlex}>
            <span className={s.value}>{detail?.velocidad}</span>
            <h5 className={s.stat}>Velocidad</h5>
            
            </div> 

            </div>
            <h3 className={s.subtitulos}>Dimensiones</h3>
            <div className={s.dimensionsConteiner}>

            <div>
            <span className={s.value}>{detail?.altura}m</span>       
            <h5 className={s.stat}>Altura</h5>
            </div> 
            
            <div>
            <span className={s.value}>{detail?.peso}kg</span>       
            <h5 className={s.stat}>Peso</h5>
            </div> 

            </div>
            <h3 className={s.subtitulos}>Tipos</h3>
            <div className={tipos.length > 1 ? s.tiposConteiner : s.tipoUnique}>    
            {tipos}
            </div>
            </div>
            </div>
            </> : <Loader/>}
            
        </div>
    )

}