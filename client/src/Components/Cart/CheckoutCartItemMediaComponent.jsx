import {
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMinusSquare as faMinusSquareSolid,
  faPlusSquare as faPlusSquareSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Media } from "reactstrap";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { getFormattedGenre } from "../../utils/getFormattedGenre";
import { connect } from "react-redux";
import { addToBooks, removeFromBooks } from "../../Actions/actionBook";
import { addBookToCart, removeBookFromCart } from "../../Actions/actionCart";

const CheckoutCartItemMediaComponent = ({
  image,
  name,
  author,
  quantity,
  genre,
  publishedDate,
  total,
  removeBookFromCart,
  addToBooks,
  addBookToCart,
  removeFromBooks,
  id,
  stock,
}) => {
  const quantityDecreaseHandler = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      removeBookFromCart(id);
      addToBooks(id);
    }
  };

  const quantityIncreaseHandler = (e) => {
    e.preventDefault();
    if (stock > 0) {
      addBookToCart(id);
      removeFromBooks(id);
    }
  };

  const [plusIcon, setPlusIcon] = useState(faPlusSquare);
  const [minusIcon, setMinusIcon] = useState(faMinusSquare);

  return (
    <div>
      <Media tag="li" className="checkout-cart-item pr-2 mb-1 border">
        <Media left>
          <Media object src={image} alt={name} className="checkout-cart-img" />
        </Media>
        <Media body className="pl-3">
          <Media heading>
            {name} <small className="text-muted author">by {author}</small>{" "}
            <div className="float-right text-success">
              {getNPRFromDollar(total.substring(1, total.length) * quantity)}
            </div>
          </Media>
          <dl class="row checkout-cart-item-info">
            <dt class="col-sm-3 text-muted">Quantity</dt>
            <dd class="col-sm-9">
              <strong className="">
                <span
                  className="cart-quantity-minus-button mr-2"
                  onClick={quantityDecreaseHandler}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setMinusIcon(faMinusSquareSolid);
                  }}
                  onMouseLeave={(e) => {
                    e.preventDefault();
                    setMinusIcon(faMinusSquare);
                  }}
                >
                  <FontAwesomeIcon icon={minusIcon} size="lg" />
                </span>
              </strong>
              {quantity}
              <strong>
                <span
                  className={
                    stock
                      ? "cart-quantity-plus-button ml-2"
                      : "cart-quantity-plus-button ml-2 disabled-button"
                  }
                  onClick={quantityIncreaseHandler}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setPlusIcon(faPlusSquareSolid);
                  }}
                  onMouseLeave={(e) => {
                    e.preventDefault();
                    setPlusIcon(faPlusSquare);
                  }}
                >
                  <FontAwesomeIcon icon={plusIcon} size="lg" />
                </span>
              </strong>
            </dd>

            <dt class="col-sm-3 text-muted">Genre</dt>
            <dd class="col-sm-9">{getFormattedGenre(genre)}</dd>

            <dt class="col-sm-3 text-muted">Date Created</dt>
            <dd class="col-sm-9">{getFormattedDate(publishedDate)}</dd>
          </dl>
        </Media>
      </Media>
    </div>
  );
};

export default connect(null, {
  addBookToCart,
  removeBookFromCart,
  addToBooks,
  removeFromBooks,
})(CheckoutCartItemMediaComponent);
