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

export const handleIsFavorite = (id, value) => {
  return {
    type: MainPageActionTypes.HANDLE_IS_FAVORITE_MOVIE,
    id: id,
    value: value,
  };
};

export const fetchSearchResults = (searchText) => {
  return async (dispatch) => {
    dispatch(fetchSearchResultsStart());
    try {
      const response = await axios.get(
        `${omdbApi}?s=${searchText}&apikey=${apiKey}`
      );
      if (response.status === 200) {
        dispatch(fetchSearchResultsSuccess(response.data.Search));
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const mainPageActions = {
  fetchSearchResults,
  handleIsFavorite,
};
