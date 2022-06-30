import React from 'react';
import defaultimg from "../../assets/img/clapperboard.png";
import "./Home.css"
const MoviePreview = ({name, image}) => {
  let movieImg = "";
  if(image === " "){movieImg = defaultimg}else{movieImg = image};
    return (
        <div className="card p-2">
        <img className="imagenes" src={movieImg} alt="not found" ></img> <h3 className="mb-0">{name}</h3>
      </div>
    );
};

export default MoviePreview;