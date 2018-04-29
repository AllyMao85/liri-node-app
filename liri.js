
var dotv = require("dotenv").config();


var keyList = require("./keys.js");

// `my-tweets`

// `spotify-this-song`

// `movie-this`

// `do-what-it-says`


function findtweets() {}


var commandApi = process.argv[2];


if (commandApi==="my-tweets") {
   var Twitter = require('twitter');
 
   var client = new Twitter({
   consumer_key: process.env.TWITTER_CONSUMER_KEY,
   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
   });
 
   var params = {screen_name: 'allynodehwork'};   //nodejs
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
      console.log(tweets);
   }
   console.log(response);
   console.log(response);
   });
}

if (commandApi==="spotify-this-song") {
  var Spotify = require('node-spotify-api');
  //var spotify = new spotify(keys.spotify); 
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   var songName = process.argv[3];
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
       return console.log('Error occurred: ' + err);
     }
 
  console.log(data.tracks.items); 
});

}

if (commandApi==="movie-this") {

   var movie = process.argv[3];
  // or
   var request = require("request");

// Then run a request to the OMDB API with the movie specified
   request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
       if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's rating is: " + JSON.parse(body));
        
       }
    });


}

if (commandApi==="do-what-it-says") {

    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
  // We will then print the contents of data
        console.log(data);
  // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        console.log(dataArr);
        for (var i=0; i<dataArr.length;i++) {
         // process.argv[i+2] = dataArr[i];
        }
    });


 }