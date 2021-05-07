import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, CardText, CardBody, Collapse } from "reactstrap";
import { removeFromBooks } from "../../Actions/actionBook";
import { addBookToCart } from "../../Actions/actionCart";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedGenre } from "../../utils/getFormattedGenre";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { useToasts } from "react-toast-notifications";

const BooksCardComponent = (props) => {
  const { addToast, toastStack, removeToast } = useToasts();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    const add = () => {
      // cartDispatch(addToCart(props.id));
      props.addBookToCart(props.id);
      props.removeFromBooks(props.id);
      const toastInToastStack = toastStack.filter(
        (toast) => toast.name === props.title
      );
      const createToast = () => {
        addToast(`${props.title} has been added to the cart.`, {
          appearance: "success",
          autoDismiss: true,
          name: props.title,
        });
      };
      if (toastInToastStack.length) {
        removeToast(toastInToastStack.id, () => {
          createToast();
        });
      } else {
        createToast();
      }
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
          addToast(
            "5 different books are in the cart. You cannot add any more.",
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
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

      <CardBody className="p-2 card-body">
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
          <strong className="text-danger">
            {getNPRFromDollar(props.price.substring(1, props.price.length))}
          </strong>
          <span
            className={
              props.stock
                ? "text-info add-to-cart-button"
                : "disabled-button text-info add-to-cart-button"
            }
            onClick={addToCardButtonHandler}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </span>
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
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addBookToCart, removeFromBooks })(
  BooksCardComponent
);
