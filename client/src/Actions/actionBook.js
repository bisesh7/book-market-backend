import {
  ADD_TO_BOOKS,
  REMOVE_FROM_BOOKS,
  SET_BOOKS,
  SET_CART,
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

export const addToBooks = (id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_BOOKS,
      bookId: id,
    });
  };
};

export const removeFromBooks = (id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_BOOKS,
      bookId: id,
    });
  };
};
