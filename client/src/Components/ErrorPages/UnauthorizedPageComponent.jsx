import React, { useEffect } from "react";
import { Jumbotron } from "reactstrap";
import RedirectTimerComponent from "../Timer/RedirectTimerComponent";

const UnauthorizedPageComponent = (props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);

  useEffect(() => {
    props.setPageTitle("401 Unauthorized | Book-Market");
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, there!</h1>
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
