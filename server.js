const express = require("express");
const books = require("./Routes/API/books");
const auth = require("./Routes/API/auth");
const user = require("./Routes/API/user");
const mongoose = require("mongoose");
const config = require("config");
const app = express();

// Body parser
app.use(express.json());

// get the mongouri from config
const db = config.get("MONGO_URI");

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("mongo db connected"))
  .catch((err) => {
    console.log(err);
  });

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
