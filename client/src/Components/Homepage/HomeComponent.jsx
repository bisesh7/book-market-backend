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
  // The options of genre in select tag
  const [genreOptions, setGenreOptions] = useState(null);
  // The genre currently being selected
  const [genreSelected, setGenreSelected] = useState("all-genres");

  // Set the genres
  useEffect(() => {
    setGenres(getGenres(props.books.books));
  }, [props.books]);

  // Generating the genres options for selecting genre
  useEffect(() => {
    // Generating options from the genres list
    const genreOptions = genres.map((genre, index) => {
      if (genre === "(no genres listed)")
        return <option key={index}>Others</option>;
      else return <option key={index}>{genre}</option>;
    });
    // Adding option of All Genres to the select
    genreOptions.unshift(
      <option key={genres.length} value="all-genres" selected>
        All Genres
      </option>
    );
    setGenreOptions(genreOptions);
  }, [genres]);

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
        genreMethods={{ setGenreSelected, genreOptions }}
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
