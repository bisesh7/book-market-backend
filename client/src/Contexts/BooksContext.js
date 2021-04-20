import React, { createContext, useReducer } from "react";
import { BooksReducer } from "../Reducers/BookReducer";

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
  const [books, booksDispatch] = useReducer(BooksReducer, { books: [] });

  return (
    <BooksContext.Provider value={{ books, booksDispatch }}>
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
