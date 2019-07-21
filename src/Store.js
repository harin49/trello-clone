import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { allReducers } from "./reducers";

const initialState = {};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
