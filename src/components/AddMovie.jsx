import React, { useState } from 'react';
import classes from "../styles/AddMovie.module.css"

const AddMovie = ({addNewMovie}) => {
    let [movieInput, setMovieInput] = useState({title:"", vote_average:"", poster_path:""});
    let handleChange = (input)=>{
        setMovieInput({...movieInput, [input.target.name]: input.target.value});
    }
    let handleSubmit = (e)=>{
        e.preventDefault();
        addNewMovie(movieInput);
        e.target.reset();
    }
    return (
        <>
            <form action="" style={Sytles.formStyle} onSubmit={handleSubmit}>
                <input className={classes.input} type="text" name="title" placeholder='Movie title'  onChange={handleChange} required/>
                <input className={classes.input} type="text" name="vote_average" placeholder='Movie rate'  onChange={handleChange} required/>
                <input className={classes.input} type="text" name="poster_path" placeholder='Movie img path' onChange={handleChange} required/>
                <input className={classes.btn} type="submit" value="Add"/>
            </form>

        </>
    );
}

export default AddMovie;

let Sytles = {
    formStyle: {width:"47%", margin:"20px auto", display:"flex", flexDirection:"column", border:"2px solid rgba(184, 184, 184, 0.54)", padding:"20px", borderRadius:"5px", boxShadow: "1px 1px 10px rgba(184, 184, 184, 0.78)"},
    inputStyle: {width:"70%", margin:"5px auto", outline:"none", border:"2px solid rgba(184, 184, 184, 0.78)", padding:"10px", borderRadius:"5px", color:"rgb(185, 182, 182)", fontSize:"17px"},
} 