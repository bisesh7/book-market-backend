import {
  ADD_TO_CART,
  DELETE_BOOK_FROM_CART,
  REMOVE_FROM_CART,
  SET_CART,
} from "../Actions/ActionTypes";

export const addBookToCart = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      bookId,
    });
  };
};

export const removeBookFromCart = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      bookId,
    });
  };
};

export const setCart = (cart) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART,
      cart,
    });
  };
};

export const deleteBookFromCart = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BOOK_FROM_CART,
      bookId,
    });
  };
};
