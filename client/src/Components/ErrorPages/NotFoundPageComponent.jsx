import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Jumbotron, Button } from "reactstrap";
import NavbarComponent from "../NavbarComponent";
import { Helmet } from "react-helmet";

const NotFoundPageComponent = (props) => {
  return (
    <div>
      <Helmet>
        <title>Page Not Found | Book-Market</title>
      </Helmet>
      <NavbarComponent {...props} />
      <Jumbotron className="main-container">
        <h1 className="display-3">
          <FontAwesomeIcon icon={faExclamation} />
          &nbsp;Hello, there!
        </h1>

        <p className="lead">
          We can't find the page you're looking for. It looks like that page
          doesn't exist.
        </p>
        <hr className="my-2" />
        <p>Please check the URI and try again.</p>
        <p className="lead">
          <Button
            color="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/");
            }}
          >
            Take Me Back To Homepage
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default NotFoundPageComponent;
