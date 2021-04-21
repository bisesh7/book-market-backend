import React, { useState } from "react";
import { Container } from "reactstrap";
import Carousel, {
  Dots,
  slidesToShowPlugin,
  autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const BooksCarousel = (props) => {
  const showDetailPage = (id) => {
    props.history.push(`/book/${id}`);
  };

  const getFeaturedBook = (image, title, author, id) => {
    return (
      <div className="d-flex justify-content-between">
        <img
          src={image}
          alt={title}
          onClick={() => {
            showDetailPage(id);
          }}
          className="book-carousel-image"
        />
        <span className="pl-3 text-white">
          <span
            className="book-card-title"
            onClick={() => {
              showDetailPage(id);
            }}
          >
            {" "}
            {title}{" "}
          </span>
          <br />
          <span className="text-muted">by</span>&nbsp;{author}
        </span>
      </div>
    );
  };

  const [value, setValue] = useState(0);
  const [slides] = useState([
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/cc0000/ffffff",
      "Bamity",
      "Nikos",
      1
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Span",
      "Adela",
      2
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Fixflex",
      "Lorianna",
      3
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Y-find",
      "Catha",
      4
    ),
  ]);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div className="books-carousel">
      <Container>
        <div>
          <Carousel
            plugins={[
              "infinite",
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 2,
                },
              },
              {
                resolve: autoplayPlugin,
                options: {
                  interval: 3000,
                },
              },
            ]}
            value={value}
            slides={slides}
            onChange={onChange}
          />
          <Dots value={value} onChange={onChange} number={slides.length} />
        </div>
      </Container>
    </div>
  );
};

export default BooksCarousel;
