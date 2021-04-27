import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./Components/Homepage/HomeComponent";
import BookDetailComponent from "./Components/BookDetails/BookDetailComponent";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider placement="bottom-center">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/book/:book" component={BookDetailComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
