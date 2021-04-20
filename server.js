const express = require("express");
const books = require("./Routes/API/books");

const app = express();

// Body parser
app.use(express.json());

// Routes for the books
app.use("/api/books", books);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at port number ${port}`);
});
