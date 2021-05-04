import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";

const OrderSummaryComponent = ({
  length,
  totalAmount,
  discount,
  className,
  proceedToCheckoutButtonHandler,
}) => {
  const couponApplyHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={className}>
      <h5>
        <strong>Order Summary</strong>
      </h5>
      <div className="order-summary-details">
        <dl class="row">
          <dd class="col-sm-6">
            {length ? length : null}{" "}
            {length > 1 ? "Items" : length ? "Item" : null} Subtotal
          </dd>
          <dt class="col-sm-6">{getNPRFromDollar(totalAmount)}</dt>

          <dd class="col-sm-6">Discount</dd>
          <dt class="col-sm-6">{getNPRFromDollar(discount)}</dt>

          <dd class="col-sm-6">Total</dd>
          <dt class="col-sm-6">{getNPRFromDollar(totalAmount - discount)}</dt>
        </dl>
      </div>

      <Button
        block
        color="primary"
        size="sm"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          const usedCoupon = discount === 0 ? false : true;
          proceedToCheckoutButtonHandler(
            totalAmount,
            usedCoupon,
            discount,
            totalAmount - discount
          );
        }}
        disabled={length === 0}
      >
        Proceed To Checkout
      </Button>
      <small className="text-muted price-checkout-note">
        *Prices may vary depending on the final shipping location.
      </small>
      <div className="price-checkout-coupon-code mt-3">
        <span>Have a coupon code?</span>
        <InputGroup size="sm" className="mt-1">
          <Input placeholder="Coupon" disabled={length === 0} />
          <InputGroupAddon addonType="append">
            <Button
              color="secondary"
              type="button"
              onClick={couponApplyHandler}
              disabled={length === 0}
            >
              Apply
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;
