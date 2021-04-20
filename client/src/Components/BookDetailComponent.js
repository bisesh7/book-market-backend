import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button, Alert } from "reactstrap";
import { BooksContext } from "../Contexts/BooksContext";
import { getFormattedDate } from "../Functions/getFormattedDate";
import { getFormattedGenre } from "../Functions/getFormattedGenre";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";
import { getNumberFromString } from "../Functions/getNumberFromString";
import CartComponent from "./CartComponent";
import NavbarComponent from "./NavbarComponent";
import { addToCart } from "../Actions/CartActions";
import { CartContext } from "../Contexts/CartContext";
import { removeFromBooks } from "../Actions/BookActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const BookDetailComponent = (props) => {
  const [bookId, setBookId] = useState();
  const { cart, cartDispatch } = useContext(CartContext);

  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const onAlertDismiss = () => setAlertVisible(false);
  const [alertMessage, setAlertMessage] = useState("");

  useState(() => {
    try {
      setBookId(getNumberFromString(props.match.params.book));
    } catch (err) {
      props.history.push("/");
    }
  }, []);

  // Getting the books from context
  const { books, booksDispatch } = useContext(BooksContext);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const book = books.books.find((book) => book.id === bookId);
    setBook(book);
  }, [books]);

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    const add = () => {
      console.log("add called");
      cartDispatch(addToCart(book.id));
      booksDispatch(removeFromBooks(book.id));
    };
    if (book.stock > 0) {
      // Check if there are 5 different books in cart
      if (cart.books.length === 5) {
        // If the cart has five book but user has selected book in cart
        if (cart.books.some((bookInCart) => bookInCart.bookId === book.id)) {
          add();
        } else {
          setAlertMessage(
            "5 different books is in the cart. You cannot select more than 5 different books."
          );
          setAlertVisible(true);
        }
      } else {
        add();
      }
    }
  };

  const bookDetail = (
    <Fragment>
      {book ? (
        <div>
          <Row>
            <Col md="6">
              <img src={book.image} className="book-image" />
            </Col>
            <Col md="6">
              <div>
                <strong>{book["name "]}</strong> <br />
                <span className="text-muted">by</span> {book.author} <br />
                <span>Genre: {getFormattedGenre(book.genre)}</span> <br />
                <span>
                  Published Date: {getFormattedDate(book["published_date"])}
                </span>
              </div>
              <div className="mt-3">
                {getNPRFromDollar(book.price.substring(1, book.price.length))}{" "}
                <br />
                <span>Stock: {book.stock}</span>
                <br />
                <Button
                  size="sm"
                  color="secondary"
                  disabled={book.stock <= 0}
                  onClick={addToCardButtonHandler}
                  className="mt-3 px-4"
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      ) : null}
    </Fragment>
  );

  return (
    <div>
      <NavbarComponent {...props} />
      <Container>
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {alertMessage}
        </Alert>
        <Row>
          <Col className="mt-3 mb-4" md="9">
            {bookDetail}
          </Col>
          <Col md="3">
            <strong>Cart</strong>
            <div className="sticky-top cart">
              <CartComponent {...props} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetailComponent;
