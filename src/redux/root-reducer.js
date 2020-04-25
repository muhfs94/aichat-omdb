import { combineReducers } from "redux";

import mainPageReducer from "./main-page/main-page.reducer";

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
});

export default rootReducer;
