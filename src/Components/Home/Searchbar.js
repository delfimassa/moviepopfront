import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMoviesByName } from "../../Redux/actions";
import "./Home.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      dispatch(getMoviesByName(name));
      // setName("");
      console.log(name);
    }
  }

  return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mx-2">
        <input
        className="searchBar p-2 mb-4 form-control text-light"
          type="text"
          value={name}
          placeholder="Buscar"
          onChange={(e) => handleInputChange(e)}
        ></input>
        </div>
      </form>
    
  );
};
export default SearchBar;