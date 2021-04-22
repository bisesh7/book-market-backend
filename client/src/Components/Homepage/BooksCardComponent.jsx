import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Button,
  CardImg,
  CardText,
  CardBody,
  Collapse,
} from "reactstrap";
import { removeFromBooks } from "../../Actions/BookActions";
import { addToCart } from "../../Actions/CartActions";
import { BooksContext } from "../../Contexts/BooksContext";
import { CartContext } from "../../Contexts/CartContext";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedGenre } from "../../utils/getFormattedGenre";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";

const BooksCardComponent = (props) => {
  // Getting the cart from context
  const { cart, cartDispatch } = useContext(CartContext);
  const { booksDispatch } = useContext(BooksContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    const add = () => {
      // cartDispatch(addToCart(props.id));
      props.addToCart(props.id);
      props.removeFromBooks(props.id);
    };
    if (props.stock > 0) {
      // Check if there are 5 different books in cart
      if (props.cart.cart.length === 5) {
        // If the cart has five book but user has selected book in cart
        if (
          props.cart.cart.some((bookInCart) => bookInCart.bookId === props.id)
        ) {
          add();
        } else {
          props.setAlertMessage(
            "5 different books is in the cart. You cannot select more than 5 different books."
          );
          props.setAlertVisible(true);
        }
      } else {
        add();
      }
    }
  };

  const showCardDetails = (e) => {
    e.preventDefault();
    props.history.push(`/book/${props.id}`);
  };

  return (
    <Card className={props.className} key={props.id}>
      <img
        top
        width="100%"
        src={props.image}
        alt={props.title}
        className="book-card-image"
        onClick={showCardDetails}
      />
      <CardBody className="p-2">
        <small>
          <strong
            className={
              props.stock
                ? "text-success float-right"
                : "text-danger float-right"
            }
          >
            {props.stock ? `In Stock` : "Out Of Stock"}
          </strong>
        </small>{" "}
        <br />
        <div tag="h6">
          <div className="d-flex justify-content-between">
            <strong className="book-card-title" onClick={showCardDetails}>
              {props.title}
            </strong>
            {isOpen ? (
              <small onClick={toggle} className="book-card-collpase-button">
                &#9650;
              </small>
            ) : (
              <small onClick={toggle} className="book-card-collpase-button">
                &#9660;
              </small>
            )}
          </div>
        </div>
        <small>
          <span className="text-muted">By</span>{" "}
          <span className="text-primary">{props.author}</span>
          <br />
          <b className="text-danger">
            {getNPRFromDollar(props.price.substring(1, props.price.length))}
          </b>
          <br />
        </small>
        <Collapse isOpen={isOpen}>
          <CardText>
            <small className="text-muted">
              <strong>
                Created at&nbsp;
                {getFormattedDate(props.published_date)} <br />
                Genre:{" "}
                {props.genre.includes("|")
                  ? getFormattedGenre(props.genre)
                  : props.genre}
              </strong>
            </small>
          </CardText>
        </Collapse>
      </CardBody>
      {/* If stock is 0 we disable button */}
      <Button
        size="sm"
        color="secondary"
        disabled={props.stock <= 0}
        onClick={addToCardButtonHandler}
        block
        outline
        className="add-to-cart-button"
      >
        <FontAwesomeIcon icon={faCartPlus} />
      </Button>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart, removeFromBooks })(
  BooksCardComponent
);
