const express = require("express");

const app = express();

// Body parser
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at port number ${port}`);
});
