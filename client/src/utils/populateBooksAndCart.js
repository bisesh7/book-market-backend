import axios from "axios";
import { setBooks } from "../Actions/BookActions";
import { setCart } from "../Actions/CartActions";

export const populateBooksAndCart = (cartDispatch, booksDispatch) => {
  const updateCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
      console.log(cart);
      cartDispatch(setCart(cart));
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
          booksDispatch(setBooks(res.data.books));
          updateCart();
        }
      });
  } else {
    booksDispatch(setBooks(books));
    updateCart();
  }
};
