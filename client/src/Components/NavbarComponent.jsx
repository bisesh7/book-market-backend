import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginSignupModal from "./User/LoginSignupModal";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const guestLinks = (
    <NavItem>
      <LoginSignupModal
        className="modal-dialog-centered"
        buttonLabel={"Checkout"}
        navLinkHidden={false}
        buttonHidden={true}
      />
    </NavItem>
  );
  const authLinks = (
    <NavItem>
      <NavLink href="https://github.com/bisesh7/book-market-backend">
        Logout
      </NavLink>
    </NavItem>
  );

  return (
    <div>
      <Navbar className="navbar" color="light" light expand="md">
        <NavbarBrand
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.history.push("/");
          }}
          className="nav-brand"
        >
          Book-Market
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/bisesh7/book-market-backend">
                Github
              </NavLink>
            </NavItem>
            {guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
