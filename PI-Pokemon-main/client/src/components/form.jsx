import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTypes, selectType} from "../redux/actions/actions";


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
    if(!input.img) {
        errors.img = 'Field required'
    }else if(!input.img.includes('http') && !input.img.includes('https')){
        errors.img = 'Debe ingresar una url valida'
    }
    if(!input.types) {
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
                                            types:''})
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
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>Nombre</label>
                <input type='text' name="name" placeholder="ej: Pikachu" onChange={(e)=>handleChange(e)}/>
                {errors.name&&<span style={{color: 'red'}}>{errors.name}</span>}
                <label>Puntos de Vida</label>
                <input type='text' name="vida" placeholder='ej: 75'onChange={(e)=>handleChange(e)}/>
                {errors.vida&&<span style={{color: 'red'}}>{errors.vida}</span>}
                <label >Puntos de Fuerza</label>
                <input type='text' name="fuerza" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                {errors.fuerza&&<span style={{color: 'red'}}>{errors.fuerza}</span>}
                <label >Puntos de Defensa</label>
                <input type='text' name="defensa" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                {errors.defensa&&<span style={{color: 'red'}}>{errors.defensa}</span>}
                <label>Puntos de Velocidad</label>
                <input type='text' name="velocidad" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                {errors.velocidad&&<span style={{color: 'red'}}>{errors.velocidad}</span>}
                <label >Altura</label>
                <input type='text' name="altura" placeholder='ej: 1,80' onChange={(e)=>handleChange(e)}/>
                {errors.altura&&<span style={{color: 'red'}}>{errors.altura}</span>}
                <label>Peso</label>
                <input type='text' name="peso" placeholder='ej: 75' onChange={(e)=>handleChange(e)}/>
                {errors.peso&&<span style={{color: 'red'}}>{errors.peso}</span>}
                <label >Url Imagen</label>
                <input type='text' name="img" placeholder="ej: http://www.imagen.com" onChange={(e)=>handleChange(e)}/>
                {errors.img&&<span style={{color: 'red'}}>{errors.img}</span>}
                <select name="types" id="types" onChange={(e) => handleChange(e)}>
                    <option defaultValue={true}>Seleccione Tipo</option>
                {types.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}    
                </select>
                {errors.types&&<span style={{color: 'red'}}>{errors.types}</span>}
        {
                // eslint-disable-next-line eqeqeq
        }{Object.values(errors).join('') == false?<input type="submit" disabled={false}/> : <input type="submit" disabled={true}/>}
        
                
            </form>


        </div>
    )



}