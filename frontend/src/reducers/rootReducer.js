import { combineReducers } from "redux";
import { searchReducer } from "./searchReducers";
import { userReducer } from "./userReducers";

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});
