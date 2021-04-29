import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/Homepage/HomeComponent";
import BookDetailComponent from "./Components/BookDetails/BookDetailComponent";
import ProfileComponent from "./Components/Profile/ProfileComponent";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { checkUser } from "./Actions/actionUser";
import { useToasts } from "react-toast-notifications";

function App(props) {
  const { addToast, removeToast } = useToasts();

  useEffect(() => {
    if (!props.user.user) {
      props.checkUser(addToast, removeToast);
    }
    // eslint-disable-next-line
  }, [props.checkUser]);

  return (
    <Fragment>
      <Helmet>
        <title>Book-Market | Task</title>
      </Helmet>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/book/:book" component={BookDetailComponent} />
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfileComponent}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { checkUser })(App);
