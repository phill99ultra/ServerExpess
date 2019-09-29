// connect the express in variable
const express = require('express');
// intialaze our app
const app = express();
// put entity of router in variable
const booksRouter = express.Router();
const characters = ['Kratos', 'Gerald of Rivia', 'Nathan Drake'];
app.use((req, res, next) => {
  console.log(
    'Date',
    new Date(),
    'Method',
    req.method,
    'URL',
    req.originalUrl,
    'Ip',
    req.ip
  );
  next();
});
// access to static elements
// __dirname = path to directory
app.use('/static', express.static(__dirname + '/public'));
app.get('/', (req, res, next) => {
  res.send("It's working!");
});
app.get('/characters', (req, res, next) => {
  next();
  // res.json({characters});
  // console.log('Page', req.query.page);
  // res.send(characters);
});
app.get('/characters/:id', (req, res, next) => {
  if (characters[req.params.id]) {
    res.send(characters[req.params.id]);
  } else {
    res.status(404).send('Character not found');
  }
});
// download file from the server
app.get('/downloadBooks', (req, res, next) => {
  res.download('./public/books.html', 'anothername', err => {
    console.log(301, 'File sent');
  });
});
// redirect
app.get('/blog', (req, res, next) => {
  res.redirect('https://point.md');
});
booksRouter.get('/', (req, res) => {
  res.send('Books');
});
booksRouter.get('/about', (req, res) => {
  res.send('About books');
});
app.use('/books', booksRouter);
// middleware for errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.stack);
});
app.listen(5000, () => {
  console.log("It's started!", new Date());
});
