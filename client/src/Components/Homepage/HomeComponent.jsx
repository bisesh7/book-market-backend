import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import BooksDisplayComponent from "./BooksDisplayComponent";
import CartComponent from "../Cart/CartComponent";
import NavbarComponent from "../NavbarComponent";
import { Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import BooksCarousel from "./BooksCarousel";
import { connect } from "react-redux";
import { setBooks } from "../../Actions/actionBook";
import { setCart } from "../../Actions/actionCart";
import { useToasts } from "react-toast-notifications";

const HomeComponent = (props) => {
  const { addToast } = useToasts();

  // useEffect(() => {
  //   addToast("Test toast", { appearance: "success" });
  // }, []);

  const [booksLoading, setBooksLoading] = useState(false);

  useEffect(() => {
    props.setBooks(setBooksLoading);
    //eslint-disable-next-line
  }, [props.setBooks]);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container fluid={true}>
        <BooksCarousel {...props} />
        <Row>
          <Col md="9">
            {booksLoading ? (
              <div className="d-flex justify-content-center mt-4">
                <Spinner color="info" />
              </div>
            ) : (
              <BooksDisplayComponent {...props} className="mt-3 mb-4" />
            )}
          </Col>
          <Col md="3">
            <div className="sticky-top">
              {/* To create a space above the cart */}
              <span>
                <br />
              </span>
              <strong className="cart-text">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </strong>
              <div>
                <CartComponent {...props} className="cart mt-3" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { setBooks, setCart })(HomeComponent);
