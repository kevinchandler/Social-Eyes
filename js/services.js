'use strict'

const request = require('request');

module.exports = {

  // TODO
  // response is tightly coupled w/ reddit atm
  userLookup: (username, apiResCallback) => {
    let posts = {
      reddit: null,
      twitter: null,
      instagram: null
    }
    redditLookup(username, (err, redditPostInfo) => {
      if ( err ) { return apiResCallback(err) }
      posts.reddit = redditPostInfo;
      apiResCallback(null, posts)
    })
  }

}

let redditLookup = (username, cb) => {
  let url = `https://reddit.com/u/${username}.json`,
      userInfo;

  request
  .get(url)
  .on('error', (err) => { return cb(err) })
  .on('response', (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      let posts = JSON.parse(body),
          userPosts = [];

      posts['data']['children'].forEach( (post) => {
        if ( !post['data'] ) { return }

        post = post['data'];
        let postObj = {
          author: post['author'],
          title: post['title'],
          body: post['body'],
          date: new Date(post['created'] * 1000), // unix time
          subreddit: post['subreddit']
        }

        userPosts.push(postObj);
     });

     return cb(null, userPosts)
   });
  })
}
