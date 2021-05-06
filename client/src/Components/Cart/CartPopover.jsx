import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  NavItem,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartComponent from "./CartComponent";

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
        Cart
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

export default CartPopover;
