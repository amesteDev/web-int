const fs = require("fs");
const csv = require("csv-parser");

const userFile = __dirname + "/movies_large/users.csv";
const ratingFile = __dirname + "/movies_large/ratings.csv";
const movieFile = __dirname + "/movies_large/movies.csv";

class CsvHandler {
  userandratings = {};
  users = [];
  ratings = [];
  movies = [];

  readUserCsv = (cb) => {

    return new Promise((resolve) => {
      fs.createReadStream(userFile)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          let userRatings = [];
          let userName = data.Name;

          this.userandratings[data.UserId] = { userName, userRatings };
          this.users.push(data);
        })
        .on("end", () => {
          cb();
        });
    });
  };

  readRatingsCsv = (cb) => {
    return new Promise((resolve) => {
      fs.createReadStream(ratingFile)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          let userId = data.UserId;

          let movieId = data.MovieId;
          let rating = data.Rating;

          let movieRating = { movieId, rating };

          this.userandratings[userId].userRatings.push(movieRating);
          this.ratings.push(data);
        })
        .on("end", () => {
          cb();
        });
    });
  };

  readMoviesCsv = (cb) => {
    return new Promise((resolve) => {
      fs.createReadStream(movieFile)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          this.movies.push({ ...data, wSum: 0, wUserScore: 0, recScore: 0 });
        })
        .on("end", () => {
          cb();
        });
    });
  };
}

module.exports = CsvHandler;

