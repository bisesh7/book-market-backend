import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Jumbotron } from "reactstrap";
import RedirectTimerComponent from "../Timer/RedirectTimerComponent";

const UnauthorizedPageComponent = (props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);

  // Set the page title to unauthorized page
  useEffect(() => {
    props.setPageTitle("401 Unauthorized | Book-Market");
    // eslint-disable-next-line
  }, [props.setPageTitle]);

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">
          <FontAwesomeIcon icon={faCog} spin />
          Hello, there!
        </h1>
        <p className="lead">
          Since this is a protected route, we are checking the session before we
          show the page. You will be redirected to the homepage, if no session
          is present.
        </p>
        <hr className="my-2" />
        <p>If there is no session present, please login to view the page.</p>
        {props.redirect ? (
          <RedirectTimerComponent
            expiryTimestamp={time}
            onExpire={() => {
              props.history.push("/");
            }}
            {...props}
          />
        ) : null}
      </Jumbotron>
    </div>
  );
};

export default UnauthorizedPageComponent;
