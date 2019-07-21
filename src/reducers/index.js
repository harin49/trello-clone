import { combineReducers } from "redux";
import { listReducer } from "./listReducer";
import { cardReducer } from "./cardReducer";

export const allReducers = combineReducers({
  listReducer,
  cardReducer
});
