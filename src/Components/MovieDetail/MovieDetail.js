import React, { useEffect } from "react";
import Reviews from "./Reviews";
import { getMovieById } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import defaultimg from "../../assets/img/clapperboard.png";
import loadingGif from "../../assets/img/loading2.svg";
import "./MovieDetail.css";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  console.log("selectedMovie desde detail", selectedMovie);
  const params = useParams();

  useEffect(() => {
    dispatch(getMovieById(params.id));
  }, [dispatch]);

  return (
    <div className="text-light">
      <section>
        {selectedMovie ? (
          <div>
            {console.log("selectedMovie:", selectedMovie)}
            <img alt={selectedMovie.name} src={selectedMovie.image? selectedMovie.image : defaultimg} className="w-100"/>
            <h1 className="text-center">Titulo: {selectedMovie.name}</h1>
            <h5>Rating: {selectedMovie.rating}</h5>
            <h5>Lenguaje: {selectedMovie.language}</h5>
            <h5>Generos: {selectedMovie.genres}</h5>
            <h5>Fecha de estreno: {selectedMovie.launching}</h5>
            <h2 className="text-center">Sinopsis:</h2>
            {selectedMovie.summary? <p className="text-center"> {selectedMovie.summary.replace(/<[^>]*>?/g, '')}</p> : 
            <div className="text-center"><img src={loadingGif} alt="loading gif"/></div>
          }
          </div>
        ) : (
          <p>OOPS! Movie not found </p>
        )}
      </section>
      {/* /////////////////////////////////////////////// */}
      <section>
        <Reviews />
      </section>
    </div>
  );
};

export default MovieDetail;
