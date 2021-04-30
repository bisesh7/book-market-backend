import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/Homepage/HomeComponent";
import BookDetailComponent from "./Components/BookDetails/BookDetailComponent";
import ProfileComponent from "./Components/Profile/ProfileComponent";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { checkUser } from "./Actions/actionUser";
import CheckoutCartComponent from "./Components/Cart/CheckoutCartComponent";

function App(props) {
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
            <Route exact path="/profile" component={ProfileComponent} />
            <Route exact path="/checkout" component={CheckoutCartComponent} />
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
