import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logoutUser, checkUser } from "../Actions/actionUser";
import LoginSignupModal from "./User/LoginSignupModal";
import { useToasts } from "react-toast-notifications";
import CartPopover from "./Cart/CartPopover";

const NavbarComponent = (props) => {
  const { addToast, removeToast, updateToast } = useToasts();

  useEffect(() => {
    if (!props.user.user) {
      props.checkUser(addToast, removeToast);
    }
    // eslint-disable-next-line
  }, [props.checkUser]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [loggingOut, setLoggingOut] = useState(false);
  const logoutHandler = (e) => {
    e.preventDefault();

    props.logoutUser(addToast, updateToast, setLoggingOut, () => {
      props.history.push("/");
    });
  };

  const profileClickHandler = (e) => {
    e.preventDefault();
    props.history.push("/profile#details");
  };

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
    <Fragment>
      <NavItem>
        <NavLink
          href="/profile"
          onClick={profileClickHandler}
          disabled={loggingOut}
        >
          Profile
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/logout" onClick={logoutHandler} disabled={loggingOut}>
          Logout
        </NavLink>
      </NavItem>
    </Fragment>
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
              <NavLink
                className="nav-link"
                href="https://github.com/bisesh7/book-market-backend"
              >
                Github
              </NavLink>
            </NavItem>
            <CartPopover {...props} />
            {props.user.user ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser, checkUser })(
  NavbarComponent
);
