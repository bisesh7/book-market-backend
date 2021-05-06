import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Button, Alert } from "reactstrap";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedGenre } from "../../utils/getFormattedGenre";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { getNumberFromString } from "../../utils/getNumberFromString";
import NavbarComponent from "../NavbarComponent";
import { addBookToCart } from "../../Actions/actionCart";
import { removeFromBooks } from "../../Actions/actionBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { setBooks } from "../../Actions/actionBook";
import { Helmet } from "react-helmet";

const BookDetailComponent = (props) => {
  const [bookId, setBookId] = useState();

  useEffect(() => {
    props.setBooks(null);
    // eslint-disable-next-line
  }, [props.setBooks]);

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

  const [book, setBook] = useState(null);

  useEffect(() => {
    const book = props.books.books.find((book) => book.id === bookId);
    setBook(book);
  }, [props.books, bookId]);

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    const add = () => {
      console.log("add called");

      props.addBookToCart(book.id);
      props.removeFromBooks(book.id);
    };
    if (book.stock > 0) {
      // Check if there are 5 different books in cart
      if (props.cart.cart.length === 5) {
        // If the cart has five book but user has selected book in cart
        if (
          props.cart.cart.some((bookInCart) => bookInCart.bookId === book.id)
        ) {
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
            <Col md="4">
              <img
                src={book.image}
                className="book-image"
                alt={book["name "]}
              />
            </Col>
            <Col md="8" className="pl-5">
              <div>
                <strong className="text-primary">{book["name "]}</strong> <br />
                <span className="text-muted">by</span> {book.author} <br />
                <div className="text-muted">
                  <span>Genre: {getFormattedGenre(book.genre)}</span> <br />
                  <span>
                    Published Date: {getFormattedDate(book["published_date"])}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <strong className="text-danger">
                  {getNPRFromDollar(book.price.substring(1, book.price.length))}
                </strong>{" "}
                <br />
                <span className={book.stock ? "text-success" : "text-danger"}>
                  {book.stock ? "In Stock" : "Out Of Stock"}
                </span>
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
      {book ? (
        <Helmet>
          <title>{book["name "]} | Book-Market </title>
        </Helmet>
      ) : null}

      <NavbarComponent {...props} />
      <Container fluid={true} className="main-container">
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {alertMessage}
        </Alert>
        {bookDetail}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  books: state.books,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  removeFromBooks,
  addBookToCart,
  setBooks,
})(BookDetailComponent);
