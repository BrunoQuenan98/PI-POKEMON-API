import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getTypes, selectType} from "../redux/actions/actions";
import s from "./form.module.css"

const validate = (input) =>{
    let errors = {};
    if(!input.name){ 
        errors.name = 'Name required'
    }
    if(!input.vida) {
        errors.vida = 'Field required'
    }else if(isNaN(input.vida)){
        errors.vida = 'Debe ingresar unicamente numeros'
    }
    if(!input.fuerza) {
        errors.fuerza = 'Field required'
    }else if(isNaN(input.fuerza)){
        errors.fuerza = 'Debe ingresar unicamente numeros'
    }
    if(!input.defensa) {
        errors.defensa = 'Field required'
    }else if(isNaN(input.defensa)){
        errors.defensa = 'Debe ingresar unicamente numeros'
    }
    if(!input.velocidad) {
        errors.velocidad = 'Field required'
    }else if(isNaN(input.velocidad)){
        errors.velocidad = 'Debe ingresar unicamente numeros'
    }
    if(!input.altura) {
        errors.altura = 'Field required'
    }else if(isNaN(input.altura.split(',').join(''))){
        errors.altura = 'Debe ingresar unicamente numeros'
    }
    if(!input.peso) {
        errors.peso = 'Field required'
    }else if(isNaN(input.peso.split(',').join(''))){
        errors.peso = 'Debe ingresar unicamente numeros'
    }
    if(!input.types.length) {
        errors.types = 'Select at least one type'
    }
    return errors
}

export const Form = () =>{

    let history = useNavigate();
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])

    const [inputs, setInputs] = useState({
                                            name:'',
                                            vida:'', 
                                            fuerza:'', 
                                            defensa:'',
                                            velocidad:'',
                                            altura:'', 
                                            peso:'',
                                            img:'', 
                                            types:[]})
    const [errors, setErrors] = useState(validate(inputs))
                                            
                               
                                    

    function handleChange(e){
    
        if(e.target.name === 'types'){
        if(!types?.includes(e.target.value)){
            dispatch(selectType(e.target.value))
            setInputs({...inputs, types:[...inputs.types, e.target.value]})
        }
        }else{
            setInputs({...inputs, [e.target.name] : e.target.value})
        }
        setErrors(validate({...inputs, [e.target.name] : e.target.value}))
        
    }

    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:3001/pokemons/', inputs)
        history("/home")
    }


    return(
        <div>
            
            <form onSubmit={(e)=>handleSubmit(e)} className={s.formConteiner}>
                <h1 className={s.titulo}>Crear Pokemon</h1>

                <label className={s.label}>Nombre</label>
                {errors.name&&<span className={s.spanError}>{errors.name}</span>}
                <input className={errors.name? s.danger : s.input} type='text' name="name" placeholder="ej: Pikachu" onChange={(e)=>handleChange(e)}/>

                <label className={s.label}>Puntos de Vida</label>
                {errors.vida&&<span className={s.spanError}>{errors.vida}</span>}
                <input className={errors.vida? s.danger : s.input} type='text' name="vida" placeholder='ej: 75'onChange={(e)=>handleChange(e)}/>
                
                <label className={s.label}>Puntos de Fuerza</label>
                {errors.fuerza&&<span className={s.spanError}>{errors.fuerza}</span>}
                <input className={errors.fuerza? s.danger : s.input} type='text' name="fuerza" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                

                <label className={s.label}>Puntos de Defensa</label>
                {errors.defensa&&<span className={s.spanError}>{errors.defensa}</span>}
                <input className={errors.defensa? s.danger : s.input} type='text' name="defensa" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                

                
                <label className={s.label}>Puntos de Velocidad</label>
                {errors.velocidad&&<span className={s.spanError}>{errors.velocidad}</span>}
                <input className={errors.velocidad? s.danger : s.input} type='text' name="velocidad" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>

                
                <label className={s.label}>Altura</label>
                {errors.altura&&<span className={s.spanError}>{errors.altura}</span>}
                <input className={errors.altura? s.danger : s.input} type='text' name="altura" placeholder='ej: 1,80' onChange={(e)=>handleChange(e)}/>

                
                <label className={s.label}>Peso</label>
                {errors.peso&&<span className={s.spanError}>{errors.peso}</span>}
                <input className={errors.peso? s.danger : s.input} type='text' name="peso" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>

                
                <label className={s.label}>Url Imagen</label>
                {!inputs.img.length&&<span className={s.opcional}>Campo opcional</span>}
                <input className={inputs.img.length ? s.input : s.opcionalInput} type='text' name="img" placeholder="ej: http://www.imagen.com" onChange={(e)=>handleChange(e)}/>
                
               
                <label className={s.label}>Tipo</label>
                {errors.types&&<span className={s.spanError}>{errors.types}</span>}
                <select className={errors.types? s.dangerSelect : s.inputSelect} name="types" id="types" onChange={(e) => handleChange(e)}>
                    <option defaultValue={true}>Seleccione Tipo</option>
                {types.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}    
                </select>
                <div className={inputs.types.length? s.tipoSelected : s.hidden}>
                    {inputs.types.map((tipo,i) => <span className={s.tipo} key={i}>{tipo}</span>)}
                </div>
                <div className={s.footer}>
        {
                // eslint-disable-next-line eqeqeq
        }{Object.values(errors).join('') == false?<input className={s.crearPokemon} type="submit" disabled={false}/> : <input type="submit" className={s.crearPokemon} disabled={true}/>}
        <Link to="/home" className={s.home}>Home</Link>
                 </div>
            </form>


        </div>
    )



}