import MainPageActionTypes from "./main-page.types";
import axios from "axios";

const omdbApi = "http://omdbapi.com/";
const apiKey = "984b259a";

export const fetchSearchResultsStart = () => ({
  type: MainPageActionTypes.FETCH_SEARCH_RESULTS_START,
});

export const fetchSearchResultsSuccess = (result) => ({
  type: MainPageActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
  payload: result,
});

export const fetchSearchResultsFailed = (error) => ({
  type: MainPageActionTypes.FETCH_SEARCH_RESULTS_FAILED,
  error: error,
});

export const resetSearchResults = () => ({
  type: MainPageActionTypes.RESET_SEARCH_RESULTS,
});

export const setIsFavoriteTrue = (id, data) => {
  return {
    type: MainPageActionTypes.SET_IS_FAVORITE_TRUE,
    id: id,
    data: data,
  };
};

export const setIsFavoriteFalse = (id) => {
  return {
    type: MainPageActionTypes.SET_IS_FAVORITE_FALSE,
    id: id,
  };
};

export const fetchMovieStart = () => ({
  type: MainPageActionTypes.FETCH_MOVIE,
});

export const fetchMovieSuccess = (data) => ({
  type: MainPageActionTypes.FETCH_MOVIE_SUCCESS,
  payload: data,
});

export const fetchMovieFailed = () => ({
  type: MainPageActionTypes.FETCH_MOVIE_FAILED,
});

export const setShowModal = (value) => ({
  type: MainPageActionTypes.SHOW_MODAL,
  value: value,
});

export const resetModalMovie = () => ({
  type: MainPageActionTypes.RESET_MODAL_MOVIE,
});

export const fetchSearchResults = (searchText) => {
  return async (dispatch) => {
    dispatch(fetchSearchResultsStart());
    try {
      const response = await axios.get(
        `${omdbApi}?s=${searchText}&apikey=${apiKey}`
      );
      if (response.status === 200 && response.data.Search) {
        dispatch(fetchSearchResultsSuccess(response.data.Search));
      } else {
        dispatch(resetSearchResults());
        dispatch(fetchSearchResultsFailed(response.data.Error));
        // alert(response.message || response.data.Error);
      }
    } catch (error) {
      dispatch(resetSearchResults());
      dispatch(fetchSearchResultsFailed());
      alert(error.message || error.data.Error);
    }
  };
};

export const fetchMovie = (id) => {
  return async (dispatch) => {
    dispatch(fetchMovieStart());
    dispatch(setShowModal(true));
    try {
      const response = await axios.get(`${omdbApi}?i=${id}&apikey=${apiKey}`);
      if (response.status === 200) {
        dispatch(fetchMovieSuccess(response.data));
      } else {
        dispatch(setShowModal(false));
        alert("Load movie failed. Please try again");
      }
    } catch (error) {
      dispatch(setShowModal(false));
      dispatch(fetchMovieFailed());
      alert("Load movie failed. Please try again");
    }
  };
};

export const handleIsFavorite = (id, value) => {
  return async (dispatch) => {
    try {
      if (value) {
        const response = await axios.get(`${omdbApi}?i=${id}&apikey=${apiKey}`);
        if (response.status === 200) {
          dispatch(setIsFavoriteTrue(id, response.data));
        }
      } else if (!value) {
        dispatch(setIsFavoriteFalse(id));
      } else {
        alert("Favorite/Unfavorite movie failed. Please try again");
      }
    } catch (error) {
      alert("Favorite/Unfavorite movie failed. Please try again");
    }
  };
};

export const mainPageActions = {
  fetchSearchResults,
  handleIsFavorite,
  resetSearchResults,
  fetchMovie,
  setShowModal,
  resetModalMovie,
};
