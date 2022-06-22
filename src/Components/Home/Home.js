import React from 'react';
import Searchbar from "./Searchbar";
import MoviePreview from "./MoviePreview";

const Home = () => {
    return (
        <div>
            <Searchbar/>
            <div>
              <MoviePreview />
            </div>
           
        </div>
    );
};

export default Home;