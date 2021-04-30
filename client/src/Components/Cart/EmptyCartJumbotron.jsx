import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Jumbotron } from "reactstrap";

const EmptyCartJumbotronComponent = (props) => {
  return (
    <div>
      <Jumbotron className="checkout-cart-empty-jumbotron">
        <h1 className="display-3">
          <FontAwesomeIcon icon={faExclamationTriangle} size="sm" />
          &nbsp;Hello, there!
        </h1>
        <p className="lead">
          You are seeing this message because, you have no items in your
          book-market cart.
        </p>
        <hr className="my-2" />
        <p>
          You have to add books to your book-market cart in order to checkout.
          Lets add books to your cart by clicking the add to cart button of the
          book you want in the homepage. Click the button below to redirect to
          homepage.
        </p>
        <p className="lead">
          <Button
            color="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/");
            }}
          >
            Add Books
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default EmptyCartJumbotronComponent;
