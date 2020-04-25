import MainPageActionTypes from "./main-page.types";

const INITIAL_STATE = {
  searchText: "",
  movieData: [],
  favoriteMovies: [],
  isLoading: false,
};

const mainPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MainPageActionTypes.FETCH_SEARCH_RESULTS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case MainPageActionTypes.FETCH_SEARCH_RESULTS_SUCCESS: {
      const payload = action.payload;
      const favoriteMovies = state.favoriteMovies;
      if (
        payload &&
        favoriteMovies &&
        payload.length > 0 &&
        favoriteMovies.length > 0
      )
        payload.forEach((arrPayload) => {
          favoriteMovies.forEach((arrFav) => {
            if (arrPayload.imdbID === arrFav.imdbID) {
              arrPayload.isFavorite = true;
            }
          });
        });
      return {
        ...state,
        movieData: payload,
        isLoading: false,
      };
    }
    case MainPageActionTypes.HANDLE_IS_FAVORITE_MOVIE: {
      state.movieData[action.index][action.property] = action.value;
      if (action.value === true) {
        state.favoriteMovies.push(state.movieData[action.index]);
      } else {
        state.favoriteMovies.splice(action.index, 1);
      }
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default mainPageReducer;
