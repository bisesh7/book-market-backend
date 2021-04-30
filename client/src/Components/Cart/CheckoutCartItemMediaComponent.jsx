import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Media } from "reactstrap";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { getFormattedDate } from "../../utils/getFormattedDate";

const CheckoutCartItemMediaComponent = ({
  image,
  name,
  author,
  quantity,
  genre,
  publishedDate,
  total,
}) => {
  return (
    <div>
      <Media tag="li" className="checkout-cart-item pr-2 mb-1 border">
        <Media left>
          <Media object src={image} alt={name} className="checkout-cart-img" />
        </Media>
        <Media body className="pl-3">
          <Media heading>
            {name} <small className="text-muted author">{author}</small>{" "}
            <div className="float-right">
              {getNPRFromDollar(total.substring(1, total.length))}
            </div>
          </Media>
          <dl class="row checkout-cart-item-info">
            <dt class="col-sm-3">Quantity</dt>
            <dd class="col-sm-9">
              <strong className="">
                <span className="cart-quantity-minus-button mr-2">
                  <FontAwesomeIcon icon={faMinusSquare} />
                </span>
              </strong>
              {quantity}
              <strong>
                <span className="cart-quantity-plus-button ml-2">
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>
              </strong>
            </dd>

            <dt class="col-sm-3">Genre</dt>
            <dd class="col-sm-9">{genre}</dd>

            <dt class="col-sm-3">Date Created</dt>
            <dd class="col-sm-9">{getFormattedDate(publishedDate)}</dd>
          </dl>
        </Media>
      </Media>
    </div>
  );
};

export default CheckoutCartItemMediaComponent;
