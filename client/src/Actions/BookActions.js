import { ADD_TO_BOOKS, REMOVE_FROM_BOOKS } from "./ActionTypes";

export const addToBooks = (id) => ({
  type: ADD_TO_BOOKS,
  bookId: id,
});

export const removeFromBooks = (id) => ({
  type: REMOVE_FROM_BOOKS,
  bookId: id,
});
