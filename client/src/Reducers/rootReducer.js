import { combineReducers } from "redux";
import bookReducer from "./reducerBook";
import CartReducer from "./reducerCart";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  books: bookReducer,
  cart: CartReducer,
  form: formReducer,
});
