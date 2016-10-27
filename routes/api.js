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
      let userInfo = SERVICES.userLookup(username);
      res.json(userInfo);
    }
  }
}
