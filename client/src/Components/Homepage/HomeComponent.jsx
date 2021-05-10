import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import BooksDisplayComponent from "./BooksDisplayComponent";
import NavbarComponent from "../NavbarComponent";
import BooksCarousel from "./BooksCarousel";
import { connect } from "react-redux";
import { setBooks } from "../../Actions/actionBook";
import { setCart } from "../../Actions/actionCart";
import { getGenres } from "../../utils/getGenres";

const HomeComponent = (props) => {
  const [booksLoading, setBooksLoading] = useState(false);
  // List of all the genres
  const [genres, setGenres] = useState([]);
  // The genre currently being selected
  const [genreSelected, setGenreSelected] = useState("all-genres");

  // Set the genres
  useEffect(() => {
    setGenres(getGenres(props.books.books));
  }, [props.books]);

  useEffect(() => {
    props.setBooks((value) => {
      setBooksLoading(value);
    });
    //eslint-disable-next-line
  }, [props.setBooks]);

  return (
    <div>
      <NavbarComponent
        {...props}
        isHomePage={true}
        genreMethods={{ setGenreSelected, genres }}
      />
      <Container fluid={true} className="main-container">
        <BooksCarousel {...props} />
        {booksLoading ? (
          <div className="d-flex justify-content-center mt-4">
            <Spinner color="info" />
          </div>
        ) : (
          <BooksDisplayComponent
            {...props}
            genreSelected={genreSelected}
            className="mt-3 mb-4"
          />
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  books: state.books,
});

export default connect(mapStateToProps, { setBooks, setCart })(HomeComponent);
