import React from 'react';
import { useState } from 'react';


function Form(props){
    function handleSubmit(e){
        e.preventDefault();
        if (name==="") {return};
        props.addTask(name);
        setName("")
    }
    function handleChange(e){
        setName(e.target.value)
    }
    const [name, setName] = useState('');
    return(
        <form onSubmit={handleSubmit}>
            <h2 className = "label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What need to be done?
                </label>
            </h2>
            <input type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
            tabIndex= "0"
            />
            <button type="submit" className="btn btn__primary btn__lg">
                ADD
            </button>
        </form>
    )
}
export default Form;