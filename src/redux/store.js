import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middlewares = [thunk];

let _store = createStore(rootReducer, applyMiddleware(...middlewares));
if (process.env.NODE_ENV === "development") {
  _store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...middlewares))
  );
}

export const store = _store;

export const persistor = persistStore(store);

export default { store, persistor };
