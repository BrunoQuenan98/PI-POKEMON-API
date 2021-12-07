import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTypes, selectType, postPokemon } from "../redux/actions/actions";


const validate = (input) =>{
    let errors = {};
    if(!input.name){ 
        errors.name = 'Name required'
    }
    if(!input.vida) {
        errors.vida = 'Vida required'
    }
    if(!input.fuerza) {
        errors.fuerza = 'Fuerza required'
    }
    if(!input.defensa) {
        errors.defensa = 'Defensa required'
    }
    if(!input.velocidad) {
        errors.velocidad = 'Velocidad required'
    }
    if(!input.altura) {
        errors.altura = 'Altura required'
    }
    if(!input.peso) {
        errors.peso = 'Peso required'
    }
    if(!input.img) {
        errors.img = 'Img required'
    }
    if(!input.types) {
        errors.types = 'Types required'
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
    
        if(e.target.name == 'types'){
        if(!types?.includes(e.target.value)){
            dispatch(selectType(e.target.value))
            setInputs({...inputs, types:[...inputs.types, e.target.value]})
        }
        }else{
            setInputs({...inputs, [e.target.name] : e.target.value})
        }
        setErrors(validate({...inputs, [e.target.name] : e.target.value}))
        
    }

     function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(inputs))
        history("/home")
    }


    return(
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label >Name</label>
                <input type='text' name="name" onChange={(e)=>handleChange(e)}/>
                {errors.name&&<span style={{color: 'red'}}>{errors.name}</span>}
                <label >Vida</label>
                <input type='number' name="vida" onChange={(e)=>handleChange(e)}/>
                {errors.vida&&<span style={{color: 'red'}}>{errors.vida}</span>}
                <label >Fuerza</label>
                <input type='number' name="fuerza" onChange={(e)=>handleChange(e)}/>
                {errors.fuerza&&<span style={{color: 'red'}}>{errors.fuerza}</span>}
                <label >Defensa</label>
                <input type='number' name="defensa" onChange={(e)=>handleChange(e)}/>
                {errors.defensa&&<span style={{color: 'red'}}>{errors.defensa}</span>}
                <label >Altura</label>
                <input type='number' name="altura" onChange={(e)=>handleChange(e)}/>
                {errors.altura&&<span style={{color: 'red'}}>{errors.altura}</span>}
                <label >Peso</label>
                <input type="number" name="peso" onChange={(e)=>handleChange(e)}/>
                {errors.peso&&<span style={{color: 'red'}}>{errors.peso}</span>}
                <label >Velocidad</label>
                <input type="number" name="velocidad" onChange={(e)=>handleChange(e)}/>
                {errors.velocidad&&<span style={{color: 'red'}}>{errors.velocidad}</span>}
                <label >Url Imagen</label>
                <input type="url" name="img" onChange={(e)=>handleChange(e)}/>
                {errors.img&&<span style={{color: 'red'}}>{errors.img}</span>}
                <select name="types" id="types" onChange={(e) => handleChange(e)}>
                    <option defaultValue={true}>Seleccione Tipo</option>
                {types.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}    
                </select>
                {errors.types&&<span style={{color: 'red'}}>{errors.types}</span>}
                {Object.values(errors).join('') == false?<input type="submit" disabled={false}/> : <input type="submit" disabled={true}/>}
                
                
            </form>


        </div>
    )



}