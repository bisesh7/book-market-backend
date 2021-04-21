import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BooksDisplayComponent from "./BooksDisplayComponent";
import CartComponent from "../Cart/CartComponent";
import NavbarComponent from "../NavbarComponent";
import { Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { BooksContext } from "../../Contexts/BooksContext";
import { CartContext } from "../../Contexts/CartContext";
import { populateBooksAndCart } from "../../utils/populateBooksAndCart";
import BooksCarousel from "./BooksCarousel";
import { connect } from "react-redux";
import { setBooks } from "../../Actions/actionBook";

const HomeComponent = (props) => {
  const { booksDispatch } = useContext(BooksContext);
  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    props.setBooks();
    // populateBooksAndCart(cartDispatch, booksDispatch);
  }, [booksDispatch, cartDispatch]);

  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const onAlertDismiss = () => setAlertVisible(false);
  const [alertMessage, setAlertMessage] = useState("");

  //   Function to scroll to the alert
  const scrollToAlert = () => {
    window.scrollTo(0, 0);
  };

  // Whenever alert is shown we slide to the top, since alert is in the top
  useEffect(() => {
    if (alertVisible) {
      scrollToAlert();
    }
  }, [alertVisible]);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container fluid={true}>
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {alertMessage}
        </Alert>
        <BooksCarousel {...props} />
        <Row>
          <Col md="9">
            <BooksDisplayComponent
              {...props}
              setAlertVisible={setAlertVisible}
              setAlertMessage={setAlertMessage}
              className="mt-3 mb-4"
            />
          </Col>
          <Col md="3">
            <div className="mt-3">
              <strong className="cart-text">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </strong>
              <div className="sticky-top cart">
                <CartComponent {...props} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { setBooks })(HomeComponent);
