// connect the express in variable
const express = require('express');
// intialaze our app
const app = express();
app.get('/', (req, res, next) => {
  res.send("It's working!");
});
app.listen(5000, () => {
  console.log("It's started!", new Date());
});
