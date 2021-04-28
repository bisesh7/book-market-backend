import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/Homepage/HomeComponent";
import BookDetailComponent from "./Components/BookDetails/BookDetailComponent";
import { ToastProvider } from "react-toast-notifications";
import ProfileComponent from "./Components/Profile/ProfileComponent";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <ToastProvider placement="bottom-center" autoDismissTimeout={4000}>
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
    </ToastProvider>
  );
}

export default App;
