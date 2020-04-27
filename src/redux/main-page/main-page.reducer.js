import MainPageActionTypes from "./main-page.types";

const INITIAL_STATE = {
  searchText: "",
  movieData: [],
  favoriteMovies: [],
  modalMovie: null,
  isLoading: false,
  showModal: false,
  fetchMovieLoading: false,
  errorMessage: "",
};

const mainPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MainPageActionTypes.FETCH_SEARCH_RESULTS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case MainPageActionTypes.FETCH_SEARCH_RESULTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
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
    case MainPageActionTypes.RESET_SEARCH_RESULTS: {
      return {
        ...state,
        movieData: INITIAL_STATE.movieData,
      };
    }
    case MainPageActionTypes.SET_IS_FAVORITE_TRUE: {
      let indexMD = state.movieData.findIndex((i) => i.imdbID === action.id);
      state.movieData[indexMD] = { isFavorite: true, ...action.data };
      state.favoriteMovies.push(state.movieData[indexMD]);
      state.favoriteMovies = state.favoriteMovies.filter(
        (value, index, array) =>
          array.findIndex((item) => item.imdbID === value.imdbID) === index
      );
      return {
        ...state,
        isLoading: false,
      };
    }
    case MainPageActionTypes.SET_IS_FAVORITE_FALSE: {
      const indexMD = state.movieData.findIndex((i) => i.imdbID === action.id);
      console.log(indexMD);
      if (indexMD > -1) {
        state.movieData[indexMD].isFavorite = false;
      }
      const newFM = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== action.id
      );
      return {
        ...state,
        isLoading: false,
        favoriteMovies: newFM,
      };
    }
    case MainPageActionTypes.FETCH_MOVIE: {
      return {
        ...state,
        fetchMovieLoading: true,
      };
    }
    case MainPageActionTypes.FETCH_MOVIE_SUCCESS: {
      return {
        ...state,
        modalMovie: action.payload,
        fetchMovieLoading: false,
      };
    }
    case MainPageActionTypes.FETCH_MOVIE_FAILED: {
      return {
        ...state,
        fetchMovieLoading: false,
      };
    }
    case MainPageActionTypes.SHOW_MODAL: {
      return {
        ...state,
        showModal: action.value,
      };
    }
    case MainPageActionTypes.RESET_MODAL_MOVIE: {
      return {
        ...state,
        modalMovie: INITIAL_STATE.modalMovie,
      };
    }
    default:
      return state;
  }
};

export default mainPageReducer;
