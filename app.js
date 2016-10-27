'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();

const PORT = process.env.PORT || 3000,
      SERVICES = require('./js/services'),
      api = require('./routes/api');

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

app.get('(?:/api)?/lookup/:username', (req, res) => {
  // TODO respond json on api
  let username = req.params.username;
  SERVICES.userLookup(username, (err, userPosts) => {
    if ( err ) { return res.status(500).send(err) }

    res.render('lookup', {
      username: username,
      reddit: userPosts.reddit
    })
  });
});


app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
