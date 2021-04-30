import React, { useEffect, useState } from "react";
import NavbarComponent from "../NavbarComponent";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Col, Container, List, ListInlineItem, Media, Row } from "reactstrap";
import CheckoutCartItemMediaComponent from "./CheckoutCartItemMediaComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";

const CheckoutCartComponent = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const { cart } = props.cart;
  const { books } = props.books;

  // Number of items in the cart
  const [numberOfItems] = useState(cart ? cart.length : 0);

  // Items displayed as media
  const [itemsMedias, setItemsMedias] = useState([]);

  // Total cost
  const [totalAmount, setTotalAmount] = useState(0);

  // Discount
  const [discount, setDiscount] = useState(1);

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
          />
        );
        setTotalAmount(totalAmount);
        setItemsMedias(itemMedias);
      });
    }
  }, [cart, books]);

  return (
    <div>
      <Helmet>
        <title>Checkout Cart | Book-Market</title>
      </Helmet>
      <NavbarComponent {...props} />
      <Container fluid={true} className="mt-1">
        <List type="inline">
          <ListInlineItem>
            <h2>My Cart</h2>
          </ListInlineItem>
          <ListInlineItem className="text-muted">
            <h5>({numberOfItems} items)</h5>
          </ListInlineItem>
        </List>
        <Row>
          <Col md="9">
            <Media className="checkout-cart" list>
              {itemsMedias}
            </Media>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  books: state.books,
});

export default connect(mapStateToProps)(CheckoutCartComponent);
