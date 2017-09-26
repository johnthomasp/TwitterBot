
var tweets = require('./tweets.js');

tweets.gettweets();
tweets.tweetit();

//Tweet every 20 seconds
setInterval(tweets.tweetit,1000*20);

