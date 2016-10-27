'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug')
app.set('views', './views');


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Social Eyes',
    message: 'Look up social posts by user handle'
  });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
