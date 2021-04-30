import React, { useEffect, useState } from "react";
import NavbarComponent from "../NavbarComponent";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Container,
  Jumbotron,
  List,
  ListInlineItem,
  Media,
  Row,
} from "reactstrap";
import CheckoutCartItemMediaComponent from "./CheckoutCartItemMediaComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
import { setBooks } from "../../Actions/actionBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div>
      <Helmet>
        <title>Checkout Cart | Book-Market</title>
      </Helmet>
      <NavbarComponent {...props} />
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
              <Jumbotron>
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
                  You have to add books to your book-market cart in order to
                  checkout. Lets add books to your cart by clicking the add to
                  cart button of the book you want in the homepage. Click the
                  button below to redirect to homepage.
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  books: state.books,
});

export default connect(mapStateToProps, { setBooks })(CheckoutCartComponent);
