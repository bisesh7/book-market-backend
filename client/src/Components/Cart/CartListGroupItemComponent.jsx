import React from "react";
import { Col, ListGroupItem, Row } from "reactstrap";
import { addToBooks, removeFromBooks } from "../../Actions/actionBook";
import { addBookToCart, removeBookFromCart } from "../../Actions/actionCart";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";

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

  return (
    <div>
      <ListGroupItem className={props.className}>
        <Row>
          <Col md="6" className="d-flex align-items-center">
            <img src={props.image} alt={props.name} className="cart-image" />
          </Col>
          <Col md="6">
            <small>
              <strong>{props.name}</strong> <br />
              Quantity: {props.quantity} <br />
              <strong className="cart-quantity-button">
                <span
                  className="cart-quantity-minus-button mr-2"
                  onClick={quantityDecreaseHandler}
                >
                  <FontAwesomeIcon icon={faMinusSquare} />
                </span>
                <span
                  className={
                    props.stock === 0
                      ? "disabled-button"
                      : "cart-quantity-plus-button"
                  }
                  onClick={quantityIncreaseHandler}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>
              </strong>
              <br />
              <b className="text-primary">
                {getNPRFromDollar(
                  props.quantity * props.price.substring(1, props.price.length)
                )}
              </b>
            </small>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
};

export default connect(null, {
  addBookToCart,
  removeBookFromCart,
  addToBooks,
  removeFromBooks,
})(CartListGroupItem);
