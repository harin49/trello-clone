import {createStore,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {allReducers} from "./reducers";

const initialState={};
let middleware = [
    thunk
]


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(allReducers, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));