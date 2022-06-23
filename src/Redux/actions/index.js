import axios from "axios";

export function getMovies() {
  return async function (dispatch) {
    try {
      dispatch({
        type: "WAITING",
      })
      let json = await axios.get("http://localhost:3001/movies"); //conecto con mi back :)
      return dispatch({
        type: "GET_MOVIES",
        payload: json.data,
      });
    } catch (error) {
      console.log("frontError, could't find any movies");
    }
  };
}

export function getMovieById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/movies/${id}`);
      console.log("getbyid desde actions", json);
      return dispatch({
        type: "GET_MOVIE_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log("Could not bring movie detail by usig id", error);
    }
  };
}

export function getMoviesByName(name) {
  return async function (dispatch) {
    try {
      dispatch({
    type: "WAITING",
  })
      let json = await axios.get(
        `http://localhost:3001/movies?name=${name}`
      );
      console.log(json);

      return dispatch({
        type: "GET_MOVIES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log("frontError, could not get movies with that name ");
    }
  };
}
