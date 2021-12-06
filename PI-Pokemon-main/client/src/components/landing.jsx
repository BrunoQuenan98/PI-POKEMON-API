import React from "react";
import { Link } from "react-router-dom";

export const Landing = () =>{

    return(
        <>
        <img src='https://www.wallpapertip.com/wmimgs/81-812636_pokemon-wallpapers-hd-hd-wallpaper-pokemon-photos-download.jpg' alt="img fondo" />
        <Link to="/home">
        <button>Comencemos!</button>
        </Link>
        </>
    )


}