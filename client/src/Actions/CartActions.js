import { ADD_TO_CART, REMOVE_FROM_CART } from "./ActionTypes";

export const addToCart = (id) => ({
  type: ADD_TO_CART,
  bookId: id,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  bookId: id,
});
