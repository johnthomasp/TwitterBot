var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var twits =
    {
        tweetit: function ()
        {
            var random = Math.floor(Math.random()*100);
            
            var tweet = {
                status: random + "." + " hello world! from a twit bot example." 
            }

            function getTweetData(err, data, response){
                if(err) {
                    console.log("Error");
                } 
                else {
                    console.log("Tweeted");
                }
            }

            T.post('statuses/update', tweet , getTweetData);
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
        }           
    }       

module.exports = twits;