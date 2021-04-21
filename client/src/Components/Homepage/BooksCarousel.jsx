import React, { useState } from "react";
import { Container } from "reactstrap";
import Carousel, {
  Dots,
  slidesToShowPlugin,
  autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const BooksCarousel = () => {
  const getFeaturedBook = (image, title, author) => {
    return (
      <div className="d-flex justify-content-between">
        <img src={image} alt="Book-Image" />
        <span className="pl-3 text-white">
          {title} <br />
          <span className="text-muted">by</span>&nbsp;{author}
        </span>
      </div>
    );
  };

  const [value, setValue] = useState(0);
  const [slides, setSlides] = useState([
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/cc0000/ffffff",
      "Bamity",
      "Nikos"
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Span",
      "Adela"
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Fixflex",
      "Lorianna"
    ),
    getFeaturedBook(
      "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
      "Y-find",
      "Catha"
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
                  interval: 4000,
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
