import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, selectType, postPokemon } from "../redux/actions/actions";

export const Form = () =>{

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
    const [errors, setErrors] = useState({
                                            name:'',
                                            vida:'', 
                                            fuerza:'', 
                                            defensa:'',
                                            velocidad:'',
                                            altura:'', 
                                            peso:'',
                                            img:'', 
                                            types:''})
                                            
                               
                                    

    function handleChange(e){
        if(e.target.name == 'types'){
        if(!types?.includes(e.target.value)){
            dispatch(selectType(e.target.value))
            setInputs({...inputs, types:[...inputs.types, e.target.value]})
        }
        }else{
            setInputs({...inputs, [e.target.name] : e.target.value})
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(inputs))
        
    }


    return(
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label >Name</label>
                <input type='text' name="name" onChange={(e)=>handleChange(e)}/>
                <label >Vida</label>
                <input type='number' name="vida" onChange={(e)=>handleChange(e)}/>
                <label >Fuerza</label>
                <input type='number' name="fuerza" onChange={(e)=>handleChange(e)}/>
                <label >Defensa</label>
                <input type='number' name="defensa" onChange={(e)=>handleChange(e)}/>
                <label >Altura</label>
                <input type='number' name="altura" onChange={(e)=>handleChange(e)}/>
                <label >Peso</label>
                <input type="number" name="peso" onChange={(e)=>handleChange(e)}/>
                <label >Velocidad</label>
                <input type="number" name="velocidad" onChange={(e)=>handleChange(e)}/>
                <label >Url Imagen</label>
                <input type="url" name="img" onChange={(e)=>handleChange(e)}/>
                <select name="types" id="types" onChange={(e) => handleChange(e)}>
                {types.map(tipo => <option value={tipo.name} key={tipo.id}>{tipo.name}</option>)}    
                </select>
                <input type="submit" />
            </form>


        </div>
    )



}