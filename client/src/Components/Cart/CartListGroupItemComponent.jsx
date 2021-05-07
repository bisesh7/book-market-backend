import React from "react";
import { Col, ListGroupItem, Row } from "reactstrap";
import {
  addToBooks,
  removeFromBooks,
  restoreBooks,
} from "../../Actions/actionBook";
import {
  addBookToCart,
  removeBookFromCart,
  deleteBookFromCart,
} from "../../Actions/actionCart";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";

const CartListGroupItem = (props) => {
  const quantityDecreaseHandler = (e) => {
    e.preventDefault();
    if (props.quantity > 0) {
      props.removeBookFromCart(props.id);
      props.addToBooks(props.id);
    }
  };

  const quantityIncreaseHandler = (e) => {
    e.preventDefault();
    if (props.stock > 0) {
      props.addBookToCart(props.id);
      props.removeFromBooks(props.id);
    }
  };

  const removeFromCartHandler = (e) => {
    e.preventDefault();
    props.deleteBookFromCart(props.id);
    props.restoreBooks(props.id, props.quantity);
  };

  return (
    <div>
      <ListGroupItem className={props.className}>
        <Row className="cart-item-row">
          <Col md="4" className="d-flex align-items-center">
            <img src={props.image} alt={props.name} className="cart-image" />
          </Col>
          <Col md="8" className="cart-item-details-col">
            <small>
              <div className="d-flex justify-content-between">
                <strong>{props.name}</strong>
                <a
                  href="#remove"
                  className="cart-delete-button"
                  onClick={removeFromCartHandler}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </a>
              </div>
              <strong>Quantity:</strong> &nbsp;{props.quantity}&nbsp;
              <br />
              <strong className="cart-quantity-button">
                <span
                  className="cart-quantity-minus-button mr-2"
                  onClick={quantityDecreaseHandler}
                >
                  <FontAwesomeIcon icon={faMinusSquare} size="lg" />
                </span>

                <span
                  className={
                    props.stock === 0
                      ? "disabled-button"
                      : "cart-quantity-plus-button"
                  }
                  onClick={quantityIncreaseHandler}
                >
                  <FontAwesomeIcon icon={faPlusSquare} size="lg" />
                </span>
              </strong>{" "}
              <br />
              <strong className="text-primary">
                {getNPRFromDollar(
                  props.quantity * props.price.substring(1, props.price.length)
                )}
              </strong>{" "}
            </small>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
};

const dispatches = {
  addBookToCart,
  removeBookFromCart,
  addToBooks,
  removeFromBooks,
  deleteBookFromCart,
  restoreBooks,
};

export default connect(null, dispatches)(CartListGroupItem);
