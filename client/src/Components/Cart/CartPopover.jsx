import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  NavItem,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartComponent from "./CartComponent";
import { connect } from "react-redux";

const CartPopover = (props) => {
  const [cartPopoverOpen, setPopoverOpen] = useState(false);

  const cartPopoverToggle = () => setPopoverOpen(!cartPopoverOpen);

  return (
    <NavItem>
      <NavLink
        className="nav-link"
        href="#cart"
        onClick={(e) => {
          e.preventDefault();
        }}
        id="CartPopover"
      >
        Cart&nbsp;
        {props.cart.cart.length ? (
          <sup>
            <Badge color="secondary" className="pt-1 pr-1">
              {props.cart.cart.length}
            </Badge>
          </sup>
        ) : null}
      </NavLink>
      <Popover
        placement="bottom"
        isOpen={cartPopoverOpen}
        target="CartPopover"
        toggle={cartPopoverToggle}
      >
        <PopoverHeader>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </PopoverHeader>
        <PopoverBody className="cart-popover">
          <CartComponent {...props} className="cart" maxAlertWidth={true} />
        </PopoverBody>
      </Popover>
    </NavItem>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartPopover);
