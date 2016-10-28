const Twitter = require('twitter');

let TwitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
  lookup: (username, cb) => {
    var params = {screen_name: 'plaintshirts'};
    TwitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) { return cb(new Error(error)) }
      cb(null, tweets)
    });
  }
}
