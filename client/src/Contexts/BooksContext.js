import React, { createContext, useReducer } from "react";
import { BooksReducer } from "../Reducers/BookReducer";
import booksJSON from "../Books/book_set.json";

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
  const [books, booksDispatch] = useReducer(BooksReducer, { books: booksJSON });

  return (
    <BooksContext.Provider value={{ books, booksDispatch }}>
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
