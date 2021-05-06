import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import BooksDisplayComponent from "./BooksDisplayComponent";
import CartComponent from "../Cart/CartComponent";
import NavbarComponent from "../NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import BooksCarousel from "./BooksCarousel";
import { connect } from "react-redux";
import { setBooks } from "../../Actions/actionBook";
import { setCart } from "../../Actions/actionCart";

const HomeComponent = (props) => {
  const [booksLoading, setBooksLoading] = useState(false);

  useEffect(() => {
    props.setBooks(setBooksLoading);
    //eslint-disable-next-line
  }, [props.setBooks]);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container fluid={true} className="main-container">
        <BooksCarousel {...props} />
        {booksLoading ? (
          <div className="d-flex justify-content-center mt-4">
            <Spinner color="info" />
          </div>
        ) : (
          <BooksDisplayComponent {...props} className="mt-3 mb-4" />
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setBooks, setCart })(HomeComponent);
