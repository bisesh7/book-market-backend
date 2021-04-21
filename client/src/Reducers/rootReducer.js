import { combineReducers } from "redux";
import bookReducer from "./reducerBook";
import CartReducer from "./reducerCart";

export default combineReducers({
  books: bookReducer,
  cart: CartReducer,
});
