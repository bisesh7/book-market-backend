import React, { useEffect, useRef, useState } from "react";
import { CardDeck, Button } from "reactstrap";
import BooksCardComponent from "./BooksCardComponent";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const BooksDisplayComponent = (props) => {
  // Contains the books of particular genre
  const [booksAccordingToGenre, setBooksAccordingToGenre] = useState(
    props.books.books
  );

  const genreSelected = props.genreSelected;

  // Filter the book results whenever the user selects a genre
  useEffect(() => {
    let booksAccordingToGenre = [];
    // If there a particular genre is selected
    if (genreSelected !== "all-genres" && genreSelected !== "Others") {
      booksAccordingToGenre = props.books.books.filter((book) =>
        // Since book can have different genres
        book.genre.includes(genreSelected)
      );
    } else if (genreSelected === "Others") {
      booksAccordingToGenre = props.books.books.filter(
        (book) => book.genre === "(no genres listed)"
      );
    } else {
      booksAccordingToGenre = props.books.books;
    }
    setBooksAccordingToGenre(booksAccordingToGenre);
  }, [genreSelected, props.books]);

  useEffect(() => {
    setNumberOfCardDecks(3);
  }, [genreSelected]);

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

    let className = "book-card shadow";

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
      // We give class name to them
      switch (lastCardDeckIndexes.length) {
        case 1:
          className += " last-card-one-card";
          finalDeckCardsClassName = className;
          break;
        case 2:
          className += " last-card-two-card";
          finalDeckCardsClassName = className;
          break;
        case 3:
          className += " last-card-three-card";
          finalDeckCardsClassName = className;
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
            {...props}
            className={
              lastCardDeckIndexes.includes(index)
                ? finalDeckCardsClassName
                : className
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
      // Card decks containing cards
      let cardDecks = [];
      // List containing a cards in a deck
      let cardsInADeck = [];
      let numberOfCardsInADeck = 5;

      for (let i = 0; i < bookCards.length; i++) {
        //   Push the card into four cardsInADeck
        cardsInADeck.push(bookCards[i]);

        // A deck will contain at most 4 cards but final deck can contain less than 4 cards
        // So we check if the deck is final or not
        if (
          (i === bookCards.length - 1 &&
            cardsInADeck.length < numberOfCardsInADeck) ||
          cardsInADeck.length === numberOfCardsInADeck
        ) {
          // Creating a card deck
          const cardDeck = (
            <CardDeck key={i} className="mb-4 book-card-deck">
              {cardsInADeck.map((item) => item.card)}
            </CardDeck>
          );
          // Push the card deck to the list of card decks
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
  const showMoreHandler = () => {
    if (numberOfCardDecks !== cardDecks.length) {
      setTimeout(() => {
        setNumberOfCardDecks(numberOfCardDecks + 1);
      }, 1200);
    }
  };

  return (
    <div className={props.className}>
      <InfiniteScroll
        dataLength={cardDecksShown.length} //This is important field to render the next data
        next={showMoreHandler}
        hasMore={numberOfCardDecks !== cardDecks.length}
        loader={
          <strong className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faSpinner} spin size="lg" />
          </strong>
        }
        className="card-decks"
      >
        {cardDecksShown}
      </InfiniteScroll>
      {/* <div className={props.className}>{cardDecksShown}</div>
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
        <div style={{ float: "left", clear: "both" }} ref={pageEnd}></div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps)(BooksDisplayComponent);
