import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap";
import { logoutUser } from "../Actions/actionUser";
import LoginSignupModal from "./User/LoginSignupModal";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Toast shown after user logout
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  const [toastIcon, setToastIcon] = useState("primary");
  const [toastMessage, setToastMessage] = useState("");

  const setAndShowToast = (toastIcon, toastMessage) => {
    setToastIcon(toastIcon);
    setToastMessage(toastMessage);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const [loggingOut, setLoggingOut] = useState(false);
  const logoutHandler = (e) => {
    e.preventDefault();
    setAndShowToast(<Spinner size="sm" />, "Logging out.");
    props.logoutUser(setAndShowToast, setLoggingOut);
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
    <NavItem>
      <NavLink href="/logout" onClick={logoutHandler} disabled={loggingOut}>
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
              <NavLink
                className="nav-link"
                href="https://github.com/bisesh7/book-market-backend"
              >
                Github
              </NavLink>
            </NavItem>
            {props.user.user ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
      <Toast className="logout-alert-toast" isOpen={showToast}>
        <ToastHeader icon={toastIcon} toggle={toggleToast} />

        <ToastBody>{toastMessage}</ToastBody>
      </Toast>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(NavbarComponent);
