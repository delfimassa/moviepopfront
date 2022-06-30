import React, { useEffect, useState } from "react";
import Reviews from "./Reviews";
import { getMovieById } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import defaultimg from "../../assets/img/clapperboard.png";
import loadingGif from "../../assets/img/loading2.svg";
import "./MovieDetail.css";
import { Rating } from "react-simple-star-rating";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  console.log("selectedMovie desde detail", selectedMovie);
  const params = useParams();


  useEffect(() => {
    dispatch(getMovieById(params.id));
  }, [dispatch]);


  let movieImg = "";
  if(selectedMovie.image === " "){movieImg = defaultimg}else{movieImg = selectedMovie.image};
  return (
    <div className="text-light contenedorDetail centrado">
      <section>
        {selectedMovie ? (
          <div className="gameDeetCard">
            <div className="gameDeetGrid">
              <div className="titleAndImg">
                {console.log("selectedMovie:", selectedMovie)}
                <img
                  alt={selectedMovie.name}
                  src={movieImg}
                  className="w-100"
                />
                <h1 className="text-center nolg noxl nomd my-4">
                  {selectedMovie.name}
                </h1>
              </div>
              <div className="details">
                <h1 className="nosm noxs mb-1">{selectedMovie.name}</h1>

                {/* <h5>Rating: {selectedMovie.rating}</h5> */}
                <div className="mb-2"><Rating
                  fillColor={"#FFDD55 "}
                  allowHalfIcon={true}
                  ratingValue={((parseFloat(selectedMovie.rating) / 2) * 20)}
                  readonly={true}
                  size={"35px"}
                /></div>
                <h5>Lenguaje: {selectedMovie.language}</h5>
                <h5>Generos: {selectedMovie.genres}</h5>
                <h5>Fecha de estreno: {selectedMovie.launching}</h5>
                <h2 className="mt-4">Sinopsis:</h2>
                {selectedMovie.summary ? (
                  <p> {selectedMovie.summary.replace(/<[^>]*>?/g, "")}</p>
                ) : (
                  <img src={loadingGif} alt="loading gif"></img>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>OOPS! Movie not found </p>
        )}
      </section>
      {/* /////////////////////////////////////////////// */}
      <section className="">
        <Reviews />
      </section>
    </div>
  );
};

export default MovieDetail;
