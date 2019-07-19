require("dotenv").config();
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);


// // Define dependent variables so they're global
// require("dotenv").config();
// // NPM Packages & API keys
// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
// for read & write
var fs = require("fs");
var query = process.argv[3];

// Check Keys
// console.log(keys);
var option = process.argv[2];
// console.log(option);


// Initialize Spotify client
// var spotify = new Spotify(keys.spotify);
switch (option) {
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:
        // 1- read file
        fs.readFile("random.txt", "utf8", function (error, data) {
            // 2-retrieve content & parse string
            var data = data.split(",");
            var thatWay = data[1];
            if (error) {
                return console.log(error);
            }
            // 3-call function 
            spotifyCall(thatWay);
        })

}

// FUNCTIONS
// SPOTIFY-THIS-SONG
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n_Track Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n" + "\nGreat song! Search another :)")
    });
}

// MOVIE-THIS
// Then run a request with axios to the OMDB API with the movie specified
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Mr. Nobody";
            }// console.log(response.data);
            // Data of Movie
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");


        }
    );
}


// CONCERT-THIS
// Then run a request with axios to the BiT API with the artist specified
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(bandsQueryUrl).then(
        function (response) {
            console.log("_Upcoming Events_");
            console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + response.data[0].datatime + "\nRock on dude!");
        });
}