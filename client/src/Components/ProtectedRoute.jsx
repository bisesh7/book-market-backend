import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = props.user;
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.user) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
