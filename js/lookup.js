'use strict'

const request = require('request'),
      async = require('async'),
      REDDIT_SERVICE = require('./services/reddit-service'),
      TWITTER_SERVICE = require('./services/twitter-service');

module.exports = {

  userLookup: (username, apiResCallback) => {
    let posts = {
      reddit: null,
      twitter: null,
      instagram: null
    }

    async.parallel([
      (callback) => {
        TWITTER_SERVICE.lookup(username, (err, twitterPostInfo) => {
          if ( err ) { return callback(err) }
          posts.twitter = twitterPostInfo;
          callback(null, 'twitter')
        })
      },
      (callback) => {
        REDDIT_SERVICE.lookup(username, (err, redditPostInfo) => {
          if ( err ) { return callback(err) }
          posts.reddit = redditPostInfo;
          callback(null, 'reddit')
        })
      }
    ], (err, results) => {
         apiResCallback(null, posts)
    });
  }
}
