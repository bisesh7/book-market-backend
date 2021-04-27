import {
  ADD_TO_BOOKS,
  REMOVE_FROM_BOOKS,
  SET_BOOKS,
  SET_CART,
} from "../Actions/ActionTypes";
import axios from "axios";

export const setBooks = (setBooksLoading) => {
  return (dispatch) => {
    if (setBooksLoading) {
      setBooksLoading(true);
    }
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
      if (setBooksLoading) {
        setBooksLoading(false);
      }
    };

    const books = JSON.parse(sessionStorage.getItem("books"));
    if (!books) {
      axios
        .get("/api/books", {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setBooksAndCart(res.data.books);
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
