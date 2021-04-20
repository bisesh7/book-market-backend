import React, { useContext, useEffect, useState } from "react";
import { Alert, ListGroup } from "reactstrap";
import { CartContext } from "../Contexts/CartContext";
import { BooksContext } from "../Contexts/BooksContext";
import CartListGroupItem from "./CartListGroupItemComponent";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";

const CartComponent = (props) => {
  const { cart } = useContext(CartContext);
  const { books } = useContext(BooksContext);
  const [cartListGroupItems, setCartListGroupItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Creating the list group items of the books in cart
  useEffect(() => {
    let cartListGroupItems = [];
    let totalAmount = 0;
    if (cart.books.length) {
      cart.books.forEach((bookInCart, index) => {
        // Finding the book with the id
        const book = books.books.find(
          (bookInBookList) => bookInBookList.id === bookInCart.bookId
        );
        const priceOfBook = book.price.substring(1, book.price.length);
        const totalPriceOfBook = priceOfBook * bookInCart.quantity;
        totalAmount += totalPriceOfBook;

        cartListGroupItems.push(
          <CartListGroupItem
            image={book.image}
            name={book["name "]}
            quantity={bookInCart.quantity}
            price={book.price}
            id={book.id}
            key={index}
            stock={book.stock}
          />
        );
      });
    }
    setCartListGroupItems(cartListGroupItems);
    setTotalAmount(totalAmount);
  }, [cart, books]);

  return (
    <div className={props.className}>
      <ListGroup className="mt-3 mb-3">{cartListGroupItems}</ListGroup>
      {cart.books.length ? (
        <small className="float-right">
          Total: {getNPRFromDollar(totalAmount)}
        </small>
      ) : (
        <Alert color="dark">Cart is empty</Alert>
      )}
    </div>
  );
};

export default CartComponent;
