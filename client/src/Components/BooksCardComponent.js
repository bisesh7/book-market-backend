import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Collapse,
} from "reactstrap";
import { removeFromBooks } from "../Actions/BookActions";
import { addToCart } from "../Actions/CartActions";
import { BooksContext } from "../Contexts/BooksContext";
import { CartContext } from "../Contexts/CartContext";
import { getFormattedDate } from "../Functions/getFormattedDate";
import { getFormattedGenre } from "../Functions/getFormattedGenre";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";

const BooksCardComponent = (props) => {
  // Getting the cart from context
  const { cart, cartDispatch } = useContext(CartContext);
  const { booksDispatch } = useContext(BooksContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    const add = () => {
      cartDispatch(addToCart(props.id));
      booksDispatch(removeFromBooks(props.id));
    };
    if (props.stock > 0) {
      // Check if there are 5 different books in cart
      if (cart.books.length === 5) {
        // If the cart has five book but user has selected book in cart
        if (cart.books.some((bookInCart) => bookInCart.bookId === props.id)) {
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

  const cardImageClickHandler = (e) => {
    e.preventDefault();
    props.history.push(`/book/${props.id}`);
  };

  return (
    <Card className="book-card" key={props.id}>
      <CardImg
        top
        width="100%"
        src={props.image}
        alt={props.title}
        className="book-card-image"
        onClick={cardImageClickHandler}
      />
      <CardBody>
        <CardTitle tag="h5">
          <div className="d-flex justify-content-between">
            {props.title}
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
        </CardTitle>

        <Collapse isOpen={isOpen}>
          <CardText>
            <small>
              Price:{" "}
              {getNPRFromDollar(props.price.substring(1, props.price.length))}{" "}
              <br />
              Stock: {props.stock} <br />
              Date Created: <br />
              {getFormattedDate(props.published_date)} <br />
              Author: {props.author}
              <br />
              Genre:{" "}
              {props.genre.includes("|")
                ? getFormattedGenre(props.genre)
                : props.genre}
            </small>
          </CardText>
        </Collapse>
        <br />
        {/* If stock is 0 we disable button */}
        <Button
          size="sm"
          color="secondary"
          disabled={props.stock <= 0}
          onClick={addToCardButtonHandler}
          block
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </Button>
      </CardBody>
    </Card>
  );
};

export default BooksCardComponent;
