var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var twits =
    {
        tweetit: function ()
        {
            var random = Math.floor(Math.random()*100);
            var tweet = {
                status: random + "." + " hello world! from a twit bot" 
            }
            console.log(tweet);
            T.post('statuses/update', tweet , getTweetData);
            function getTweetData(err, data, response){
                if(err) {
                    console.log(err.name + ': ' + err.message);;
                } 
                else {
                    console.log("Tweeted");
                }
            }
        },
        
        tweetit: function (message)
        {
            var tweet = {
                status: message 
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
        
        replytweets:function()
        {
            //Setup a user
            var stream = T.stream('user')
            stream.on('follow', followed)
            function followed(eventData){
                console.log('followed');
                var name = eventData.source.name;
                var screenName = eventData.source.screen_name;
                var msg ='@' + screenName + ' Cool';
                twits.tweetit(msg);
            }
        }
    }       

module.exports = twits;