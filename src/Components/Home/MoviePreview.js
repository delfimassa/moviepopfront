import React from 'react';
import defaultimg from "../../assets/img/clapperboard.png";

const MoviePreview = ({name, image}) => {
    return (
        <div className="card">
        <img className="imagenes" src={image? image : defaultimg} alt="not found" ></img> <h3>{name}</h3>
      </div>
    );
};

export default MoviePreview;