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

const HomeComponent = (props) => {
  const [booksLoading, setBooksLoading] = useState(false);

  useEffect(() => {
    props.setBooks(setBooksLoading);
    //eslint-disable-next-line
  }, [props.setBooks]);

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
            {booksLoading ? (
              <div className="d-flex justify-content-center mt-4">
                <Spinner color="info" />
              </div>
            ) : (
              <BooksDisplayComponent
                {...props}
                setAlertVisible={setAlertVisible}
                setAlertMessage={setAlertMessage}
                className="mt-3 mb-4"
              />
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
