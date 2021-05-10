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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import FilterGenreSelect from "./Homepage/FilterGenreSelect";

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

  const [page, setPage] = useState("home");
  useEffect(() => {
    console.log(props.location);
    switch (props.location.pathname) {
      case "/profile":
        setPage("profile");
        break;
      default:
        setPage("/");
        break;
    }
  }, [props.location]);

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
          active={page === "profile"}
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
      <Navbar className="navbar fixed-top" color="light" light expand="md">
        <NavbarBrand
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.history.push("/");
          }}
          className="nav-brand"
        >
          <FontAwesomeIcon icon={faBook} />
          &nbsp;Book-Market
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-genre-filter">
            {props.isHomePage ? (
              <FilterGenreSelect
                setGenreSelected={props.genreMethods.setGenreSelected}
                genres={props.genreMethods.genres}
                className="navbar-genre-select"
              />
            ) : null}
          </Nav>

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
