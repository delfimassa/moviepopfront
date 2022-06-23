import React from 'react';
import logo from "../assets/img/cinema.png"
import "./Landing.css";
 
const Landing = () => {
    return (
        <div>
            <div className="logoYtitulo text-center">
            <img alt="logo" src={logo}/>
            <h1 className="amarillo display-4 tituloLanding">MoviePop!</h1>
            </div>
        </div>
    );
};

export default Landing;