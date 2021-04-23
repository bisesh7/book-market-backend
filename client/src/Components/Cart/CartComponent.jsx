import React, { useEffect, useState } from "react";
import { Alert, ListGroup } from "reactstrap";
import CartListGroupItem from "./CartListGroupItemComponent";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { connect } from "react-redux";
import LoginSignupModal from "../User/LoginSignupModal";

const CartComponent = (props) => {
  const [cartListGroupItems, setCartListGroupItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Creating the list group items of the books in cart
  useEffect(() => {
    let cartListGroupItems = [];
    let totalAmount = 0;
    if (props.cart.cart.length) {
      props.cart.cart.forEach((bookInCart, index) => {
        // Finding the book with the id
        const book = props.books.books.find(
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
            className="cart-item d-flex p-0 border-0 mb-2"
          />
        );
      });
    }
    setCartListGroupItems(cartListGroupItems);
    setTotalAmount(totalAmount);
  }, [props.cart, props.books]);

  return (
    <div className={props.className}>
      <ListGroup className="mb-3 cart-list">{cartListGroupItems}</ListGroup>
      {props.cart.cart.length ? (
        <div>
          <small className="float-right">
            Total: {getNPRFromDollar(totalAmount)}
          </small>{" "}
          <br />{" "}
          <LoginSignupModal
            className="modal-dialog-centered"
            buttonLabel={"Checkout"}
          />
        </div>
      ) : (
        <Alert color="dark" className="text-center cart-empty-alert">
          <strong>Your cart is empty.</strong> <br />
          <small>Please add the books to the cart.</small>
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  books: state.books,
  cart: state.cart,
});

export default connect(mapStateToProps)(CartComponent);
