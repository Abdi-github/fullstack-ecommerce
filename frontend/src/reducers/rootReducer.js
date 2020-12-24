import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducers";
import { userReducer } from "./userReducers";

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});
