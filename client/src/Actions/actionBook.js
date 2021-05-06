import {
  ADD_TO_BOOKS,
  REMOVE_FROM_BOOKS,
  RESTORE_BOOK,
  SET_BOOKS,
  SET_CART,
} from "../Actions/ActionTypes";
import axios from "axios";

export const setBooks = (cb) => {
  return (dispatch) => {
    const setBooksAndCart = (books) => {
      dispatch({
        type: SET_BOOKS,
        books,
      });
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      if (cart) {
        dispatch({
          type: SET_CART,
          cart,
        });
      }
    };

    const books = JSON.parse(sessionStorage.getItem("books"));
    if (!books) {
      if (cb) {
        cb(true);
      }
      axios
        .get("/api/books", {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => {
          if (cb) {
            cb(false);
          }
          if (res.data.success) {
            setBooksAndCart(res.data.books);
          }
        })
        .catch((err) => {
          if (cb) {
            cb(false);
          }
        });
    } else {
      setBooksAndCart(books);
    }
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

export const restoreBooks = (id, quantity) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_BOOK,
      bookId: id,
      quantity,
    });
  };
};
