import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CardDeck,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { BooksContext } from "../../Contexts/BooksContext";
import { getGenres } from "../../utils/getGenres";
import BooksCardComponent from "./BooksCardComponent";

const BooksDisplayComponent = (props) => {
  // Getting the books from context
  const { books } = useContext(BooksContext);
  // Contains the books of particular genre
  const [booksAccordingToGenre, setBooksAccordingToGenre] = useState(
    books.books
  );
  // List of all the genres
  const [genres, setGenres] = useState([]);
  // The options of genre in select tag
  const [genreOptions, setGenreOptions] = useState(null);
  // The genre currently being selected
  const [genreSelected, setGenreSelected] = useState("all-genres");

  // Set the genres
  useEffect(() => {
    setGenres(getGenres(books.books));
  }, [books]);

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

  // Filter the book results whenever the user selects a genre
  useEffect(() => {
    let booksAccordingToGenre = [];
    // If there a particular genre is selected
    if (genreSelected !== "all-genres" && genreSelected !== "Others") {
      booksAccordingToGenre = books.books.filter((book) =>
        // Since book can have different genres
        book.genre.includes(genreSelected)
      );
    } else if (genreSelected === "Others") {
      booksAccordingToGenre = books.books.filter(
        (book) => book.genre === "(no genres listed)"
      );
    } else {
      booksAccordingToGenre = books.books;
    }

    setNumberOfCardDecks(3);
    setBooksAccordingToGenre(booksAccordingToGenre);
  }, [genreSelected, books]);

  //   All the book cards
  const [bookCards, setBookCards] = useState(null);

  // const cardDeckHasFourCards = (index) => {
  //   index = index + 1;
  //   let flag = false;

  //   if (index % 4 === 0) {
  //     flag = true;
  //   } else {
  //     flag = false;
  //   }

  //   return flag;
  // };

  //   Generating cards of books in genre
  useEffect(() => {
    // This is done to identify the cards of last deck if the last deck has
    // less than 4 cards
    let finalDeckCardsClassName = "";
    // This contains the indexes of the cards in the last deck
    let lastCardDeckIndexes = [];

    // If the card deck has less than 4 cards then total number of books when
    // divided by 4 will produce remainder
    if (booksAccordingToGenre.length % 4 !== 0) {
      // Total number of card deck minus the last card deck
      const numberOfCardDecks = Math.floor(booksAccordingToGenre.length / 4);
      // The starting index of the first card in the last deck
      const lastCardDeckStartingIndex = numberOfCardDecks * 4;

      // Pushing all the indexes of the book in last card deck
      for (
        let i = lastCardDeckStartingIndex;
        i < booksAccordingToGenre.length;
        i++
      ) {
        lastCardDeckIndexes.push(i);
      }

      // Depending upon the number of cards in the last deck
      // We give classname to them
      switch (lastCardDeckIndexes.length) {
        case 1:
          finalDeckCardsClassName = "book-card last-card-one-card";
          break;
        case 2:
          finalDeckCardsClassName = "book-card last-card-two-cards";
          break;
        case 3:
          finalDeckCardsClassName = "book-card last-card-three-cards";
          break;
        default:
          break;
      }
    }

    const bookCards = booksAccordingToGenre.map((book, index) => {
      return {
        key: book.id,
        card: (
          <BooksCardComponent
            id={book.id}
            title={book["name "]}
            image={book.image}
            price={book.price}
            stock={book.stock}
            author={book.author}
            genre={book.genre}
            published_date={book.published_date}
            key={book.id}
            setAlertVisible={props.setAlertVisible}
            setAlertMessage={props.setAlertMessage}
            {...props}
            className={
              lastCardDeckIndexes.includes(index)
                ? finalDeckCardsClassName
                : "book-card"
            }
          />
        ),
      };
    });
    setBookCards(bookCards);
  }, [booksAccordingToGenre, props]);

  // Decks of book cards
  const [cardDecks, setCardDecks] = useState([]);

  //   Creating card deck so that the cards will be displayed in a grid
  useEffect(() => {
    if (bookCards) {
      // Card decks containg cards
      let cardDecks = [];
      // List containing a cards in a deck
      let cardsInADeck = [];

      for (let i = 0; i < bookCards.length; i++) {
        //   Push the card into four cardsInADeck
        cardsInADeck.push(bookCards[i]);

        // A deck will contain at most 4 cards but final deck can contain less than 4 cards
        // So we check if the deck is final or not
        if (
          (i === bookCards.length - 1 && cardsInADeck.length < 4) ||
          cardsInADeck.length === 4
        ) {
          // Creating a card deck
          const cardDeck = (
            <CardDeck key={i} className="mb-4">
              {cardsInADeck.map((item) => item.card)}
            </CardDeck>
          );
          // Push the card deck to the list of carddecks
          cardDecks.push(cardDeck);
          //   empty the cardInADeck list
          cardsInADeck = [];
        }
      }
      setCardDecks(cardDecks);
    }
  }, [bookCards]);

  //   Number of card deck initially shown
  const [numberOfCardDecks, setNumberOfCardDecks] = useState(3);
  // Card deck currently in the DOM
  const [cardDecksShown, setCardDecksShown] = useState([]);

  // Showing only few card decks. This is done for UX and UI
  useEffect(() => {
    if (cardDecks) {
      setCardDecksShown(cardDecks.slice(0, numberOfCardDecks));
    }
  }, [cardDecks, numberOfCardDecks]);

  //   Reference to the end of the page
  let pageEnd = useRef(null);

  //   Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  //   Whenever show more is clicked we add another deck of cards
  const showMoreHandler = (e) => {
    e.preventDefault();
    if (numberOfCardDecks !== cardDecks.length) {
      setNumberOfCardDecks(numberOfCardDecks + 1);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
  };

  return (
    <div className={props.className}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={faFilter} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          onChange={(e) => {
            setGenreSelected(e.target.value);
          }}
          type="select"
          className="genre-select"
          defaultValue="all-genres"
        >
          {genreOptions}
        </Input>
      </InputGroup>

      <div className={props.className}>{cardDecksShown}</div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          outline
          color="primary"
          onClick={showMoreHandler}
          disabled={cardDecks.length === cardDecksShown.length}
        >
          {cardDecks.length === cardDecksShown.length
            ? "No More Books"
            : "Load More"}
        </Button>
        {/* Div for bottom of the page reference */}
        <div style={{ float: "left", clear: "both" }} ref={pageEnd}></div>
      </div>
    </div>
  );
};

export default BooksDisplayComponent;
