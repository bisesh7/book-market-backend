const express = require("express");
const books = require("./Routes/API/books");
const auth = require("./Routes/API/auth");
const user = require("./Routes/API/user");

const app = express();

// Body parser
app.use(express.json());

// Routes for the books
app.use("/api/books", books);
// Routes for the auth
app.use("/api/auth", auth);
// Routes for the user
app.use("/api/user", user);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at port number ${port}`);
});
