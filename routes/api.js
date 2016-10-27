'use strict'

const SERVICES = require('../js/services.js');

module.exports = {
  lookup: (req, res) => {
    let username = req.query.username;

    if ( !username ) {
      res.json({
        error: 'username not provided'
      })
    } else {
      SERVICES.userLookup(username, (err, userPosts) => {
        if ( err ) { return res.status(500).send(err) }
        res.json(userPosts)
      });
    }
  }
}
