var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var twits =
    {
        //Post a tweet
        tweetit: function (message)
        {
            var tweet;
            if (message === undefined)
            {
                var random = Math.floor(Math.random()*100);
                tweet = {
                    status: random + "." + " Hi from a twit bot" 
                }
            }
            else
            {
                tweet = {
                status: message 
                }
            }
            console.log(tweet);
            
            T.post('statuses/update', tweet , getTweetData);
            function getTweetData(err, data, response){
                if(err) {
                   console.log(err.name + ': ' + err.message);
                } 
                else {
                    console.log("Tweeted");
                }
            }
        },

        //Get top 5 tweets that has NFL as keywordreply when someone follows you
        gettweets: function()
        {
            var params = { 
                q: 'NFL', 
                count: 5 
             }

            function getData(err, data, response) {
                var tweets = data.statuses;
                for(var i = 0; i < tweets.length; i++) {
                console.log( i+1 + ". " + tweets[i].text);
                }
            }

            T.get('search/tweets', params , getData);
        },
        
        //reply when someone follows you
        replytweets:function()
        {
            //Setup a user
            var stream = T.stream('user')
            stream.on('follow', followed)
            function followed(eventData){
                console.log('followed');
                var name = eventData.source.name;
                var screenName = eventData.source.screen_name;
                var msg ='@' + screenName + ' Jhakaas';
                twits.tweetit(msg);
            }
        }
    }       

module.exports = twits;