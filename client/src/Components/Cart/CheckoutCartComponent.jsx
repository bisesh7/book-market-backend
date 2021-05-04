import React, { useEffect, useState } from "react";
import NavbarComponent from "../NavbarComponent";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Col, Container, List, ListInlineItem, Media, Row } from "reactstrap";
import CheckoutCartItemMediaComponent from "./CheckoutCartItemMediaComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
import { setBooks } from "../../Actions/actionBook";
import getUserData from "../../config/userDataAPI";
import UnauthorizedPageComponent from "../ErrorPages/UnauthorizedPageComponent";
import EmptyCartJumbotronComponent from "./EmptyCartJumbotron";

const CheckoutCartComponent = (props) => {
  useEffect(() => {
    props.setBooks(null);
    // eslint-disable-next-line
  }, [props.setBooks]);

  const { cart } = props.cart;
  const { books } = props.books;

  // Items displayed as media
  const [itemsMedias, setItemsMedias] = useState([]);

  // Total cost
  const [totalAmount, setTotalAmount] = useState(0);

  // Discount
  // TODO: remove next comment after setDiscount has been used
  // eslint-disable-next-line
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cart.length) {
      let itemMedias = [];
      let totalAmount = 0;
      cart.forEach((bookInCart, key) => {
        // Finding the book with the id
        const book = books.find(
          (bookInBookList) => bookInBookList.id === bookInCart.bookId
        );

        // Generating the total amount of book and net total amount in cart
        const priceOfBook = book.price.substring(1, book.price.length);
        const totalPriceOfBook = priceOfBook * bookInCart.quantity;
        totalAmount += totalPriceOfBook;

        itemMedias.push(
          <CheckoutCartItemMediaComponent
            image={book.image}
            name={book["name "]}
            author={book.author}
            quantity={bookInCart.quantity}
            genre={book.genre}
            publishedDate={book.published_date}
            total={book.price}
            key={key}
            id={book.id}
            stock={book.stock}
          />
        );
        setTotalAmount(totalAmount);
        setItemsMedias(itemMedias);
      });
    }
  }, [cart, books]);

  useEffect(() => {
    if (!cart.length) {
      setTotalAmount(0);
    }
  }, [cart]);

  // CheckoutCart is protected route
  const user = props.user ? props.user.user : null;
  // If user refreshed the page, we need to know if session exists or not
  const [showCheckoutCart, setShowCheckoutCart] = useState(false);
  // This is for ux purpose. We redirect if session do not exist after 5 secs.
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // When user refreshes the page, store will be defaulted
    // Even though user session is checked in the navbar, it is in the child component
    // So we check here if user is null, while we are checking the session, we show an spinner.
    // If no session exists, we redirect to home
    if (!user) {
      getUserData()
        .then((res) => {
          // Response given only if session exist i.e tokens are valid
          setShowCheckoutCart(true);
        })
        .catch((err) => {
          // If error then we redirect
          setShowCheckoutCart(false);
          setRedirect(true);
        });
    } else {
      // If page is not refreshed user exists.
      setShowCheckoutCart(true);
    }
  }, [user]);

  const [pageTitle, setPageTitle] = useState("Checkout Cart | Book-Market");

  useEffect(() => {
    setPageTitle("Checkout Cart | Book-Market");
  }, []);

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <NavbarComponent {...props} />
      {showCheckoutCart ? (
        <Container fluid={true} className="mt-1">
          {cart.length ? (
            <List type="inline">
              <ListInlineItem>
                <h2>My Cart</h2>
              </ListInlineItem>
              <ListInlineItem className="text-muted">
                <h5>({cart.length} items)</h5>
              </ListInlineItem>
            </List>
          ) : null}

          <Row>
            <Col md="9">
              {cart.length ? (
                <Media className="checkout-cart" list>
                  {itemsMedias}
                </Media>
              ) : (
                <EmptyCartJumbotronComponent {...props} />
              )}
            </Col>
            <Col md="3">
              <OrderSummaryComponent
                length={cart.length}
                totalAmount={totalAmount}
                discount={discount}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <UnauthorizedPageComponent
          {...props}
          setPageTitle={setPageTitle}
          redirect={redirect}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  books: state.books,
});

export default connect(mapStateToProps, { setBooks })(CheckoutCartComponent);
