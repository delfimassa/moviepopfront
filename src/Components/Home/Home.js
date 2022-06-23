import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux/actions";
import { Link } from "react-router-dom";
import loadingGif from "../../assets/img/loading2.svg";
import Searchbar from "./Searchbar";
import MoviePreview from "./MoviePreview";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const allMovies = useSelector((state) => state.movies);
  const loading = useSelector((state) => state.loading);

  return (
    <div className="text-light">
      <Searchbar />
      <div className="text-center">
        <h4 className="mb-4">Películas</h4>
        <hr />
        {loading ? (
          <div className="loader">
            <img src={loadingGif} alt="loading gif"></img>
          </div>
        ) : allMovies.length ? (
          <div className="row">
            {
            //   console.log("allMovies:", allMovies)
              allMovies.map((e) => {
                return (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={e.id}>
                    <Link to={`/movies/${e.id}`} className="hoverCards titulos">
                      <MoviePreview
                        name={e.name}
                        image={e.image.medium? e.image.medium : e.image}
                        key={e.id}
                      />
                    </Link>
                  </div>
                );
              })
            }
          </div>
        ) : (
          <div>
            <p>No movies found...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
