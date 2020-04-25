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
      let index = state.movieData.findIndex(i => i.imdbID === action.id);
      state.movieData[index].isFavorite = action.value;
      if (action.value === true) {
        state.favoriteMovies.push(state.movieData[index]);
      } else {
        index = state.favoriteMovies.findIndex(i => i.imdbID === action.id);
        state.favoriteMovies.splice(index, 1);
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
