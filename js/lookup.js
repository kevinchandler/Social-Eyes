'use strict'

const request = require('request'),
      REDDIT_SERVICE = require('./services/reddit-service'),
      TWITTER_SERVICE = require('./services/twitter-service');

module.exports = {

  userLookup: (username, apiResCallback) => {
    let posts = {
      reddit: null,
      twitter: null,
      instagram: null
    }

    // reddit
    REDDIT_SERVICE.lookup(username, (err, redditPostInfo) => {
      if ( err ) { return apiResCallback(err) }
      posts.reddit = redditPostInfo;
      // apiResCallback(null, posts)
      // will need to callback after ALL is completed
    })

    // twitter
    TWITTER_SERVICE.lookup(username, (err, twitterPostInfo) => {
      if ( err ) { return apiResCallback(err) }
      posts.twitter = twitterPostInfo;
      // apiResCallback(null, posts)
      // will need to callback after ALL is completed
    })

    // TODO callback when all services have responded
    setTimeout(() => {
      apiResCallback(null, posts)
    }, 20000);


    // instagram
  }

}
