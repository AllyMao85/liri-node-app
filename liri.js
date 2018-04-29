
var dotv = require("dotenv").config();


var keyList = require("./keys.js");

// `my-tweets`

// `spotify-this-song`

// `movie-this`

// `do-what-it-says`




var commandApi = process.argv[2];


if (commandApi==="my-tweets") {
   findtweets();
}

if (commandApi==="spotify-this-song") {
  var songName = process.argv[3];
  findsong(songName);

}


if (commandApi==="movie-this") {

   var movie = process.argv[3];
  findmovie(movie);
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
        // for (var i=0; i<dataArr.length;i++) {
        //  process.argv[i+2] = dataArr[i];
        // }
            
        if (dataArr[0]==="my-tweets") {
            findtweets();
        }

        if (dataArr[0]==="spotify-this-song") {
            findsong(dataArr[1]);
        }


       if (dataArr[0]==="movie-this") {
            findmovie(dataArr[1]);
        }

     });
 }


function findtweets() {
  var Twitter = require('twitter');
 
  var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var params = {screen_name: 'allynodehwork'};   //nodejs
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  // if (!error) {
  //    console.log(tweets);
  // }
  //console.log(response);
  //console.log(tweets);
  
  var n=Math.min(20,tweets.length);
  // We then store the textfile filename given to us from the command line
  for (var i=0; i<n;i++){
    //console.log(tweets[i]);
     var twitterContent = tweets[i].created_at +", "+tweets[i].text;
     console.log(tweets[i].created_at +", "+tweets[i].text);

     var fs = require("fs");
     fs.appendFile("log.txt", twitterContent, function(err) {
        if (err) {
           console.log(err);
        }
        else {
           console.log("Content Added!");
        }
  

     });
   }
  
  });
}


function findsong(songName) {
  var Spotify = require('node-spotify-api');
  //var spotify = new spotify(keys.spotify); 
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
       return console.log('Error occurred: ' + err);
     }
  //console.log(data.album.id)
  for (i=0; i<data.tracks.items.length;i++) {
  console.log("======================================================");
  console.log(data.tracks.items[i].name);
  console.log(data.tracks.items[i].album.name); 
  console.log(data.tracks.items[i].preview_url); 
  console.log("======================================================");
  var songContent = data.tracks.items[i].name +", "+data.tracks.items[i].album.name+', '+data.tracks.items[i].preview_url;
     

     var fs = require("fs");
     fs.appendFile("log.txt", songContent, function(err) {
        if (err) {
           console.log(err);
        }
        else {
           console.log("Content Added!");
        }
  

     });
    }
   });
}

function findmovie(movie) {
  var request = require("request");

  // Then run a request to the OMDB API with the movie specified
     request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  
    // If the request is successful (i.e. if the response status code is 200)
         if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("======================================================");
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot); 
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("======================================================");
          
          var movieContent = JSON.parse(body).Title + ', ' + JSON.parse(body).Year;
     

          var fs = require("fs");
          fs.appendFile("log.txt", movieContent, function(err) {
            if (err) {
               console.log(err);
            }
            else {
               console.log("Content Added!");
            }
  

          });


         }
      });
}