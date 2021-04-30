import React from "react";
import NavbarComponent from "../NavbarComponent";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const CheckoutComponent = (props) => {
  return (
    <div>
      <Helmet>
        <title>Checkout | Book-Market</title>
      </Helmet>
      <NavbarComponent {...props} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  book: state.book,
});

export default connect(mapStateToProps)(CheckoutComponent);
