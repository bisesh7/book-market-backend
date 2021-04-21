import {
  ADD_TO_BOOKS,
  REMOVE_FROM_BOOKS,
  SET_BOOKS,
} from "../Actions/ActionTypes";
import axios from "axios";

export const setBooks = () => {
  return (dispatch) => {
    axios
      .get("/api/books", {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: SET_BOOKS,
            books: res.data.books,
          });
        }
      });
  };
};
