import { combineReducers } from "redux";
import bookReducer from "./reducerBook";

export default combineReducers({
  books: bookReducer,
});
