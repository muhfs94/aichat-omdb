import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import mainPageReducer from "./main-page/main-page.reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["mainPage"],
};

const mainPagePersistConfig = {
  key: "mainPage",
  storage,
  whitelist: ['favoriteMovies'],
};

const rootReducer = combineReducers({
  mainPage: persistReducer(mainPagePersistConfig, mainPageReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
