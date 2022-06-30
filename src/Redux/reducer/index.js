const initialState = {
  allmovies: [],
  movies: [],
  detail: [],
//   reviews: [],
//   createdReview: [],
  loading: false,
  currentUser: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        allmovies: action.payload,
        loading: false,
      };

    case "GET_MOVIES_BY_NAME":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };

    case "GET_MOVIE_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };

      case "REGISTER_SUCCESS":
        return { ...state, currentUser: action.payload, };

    case "WAITING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
