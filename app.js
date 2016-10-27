'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express(),
    PORT = process.env.PORT || 3000;

const api = require('./routes/api');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug')
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Look up social posts by user handle'
  });
});

app.use('/api/lookup', api.lookup);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
