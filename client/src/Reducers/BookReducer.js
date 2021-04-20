import { ADD_TO_BOOKS, REMOVE_FROM_BOOKS } from "../Actions/ActionTypes";

const addBook = (bookId, state) => {
  const updatedBooks = [...state.books];
  const updatedBookIndex = updatedBooks.findIndex((item) => item.id === bookId);

  if (updatedBookIndex >= 0) {
    const updatedBook = {
      ...updatedBooks[updatedBookIndex],
    };
    updatedBook.stock++;
    updatedBooks[updatedBookIndex] = updatedBook;
  }
  return { ...state, books: updatedBooks };
};

const removeBook = (bookId, state) => {
  const updatedBooks = [...state.books];
  const updatedBookIndex = updatedBooks.findIndex((item) => item.id === bookId);

  const updatedBook = {
    ...updatedBooks[updatedBookIndex],
  };

  updatedBook.stock--;
  if (updatedBook.stock >= 0) {
    updatedBooks[updatedBookIndex] = updatedBook;
  }
  return { ...state, books: updatedBooks };
};

export const BooksReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BOOKS:
      return addBook(action.bookId, state);
    case REMOVE_FROM_BOOKS:
      return removeBook(action.bookId, state);
    default:
      return state;
  }
};
