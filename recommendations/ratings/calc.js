const euc = require("./euc");
const pearson = require("./pearson");

class Calculator {
  eucl = new euc();
  pears = new pearson();

  calcEuc(user, ld) {
    
    let simscore = {};
    for (const userB of ld.users) {
      if (userB.UserId == user) {
        continue;
      }

      let simRating = this.eucl.calcEuclidean(
        ld.userandratings[user],
        ld.userandratings[userB.UserId]
      ).toFixed(4);

      simscore[userB.UserId] = simRating;
    }
    return simscore;
  }

  calcPearson(user, ld) {
    let simscore = {};
    for (const userB of ld.users) {
      if (userB.UserId == user) {
        continue;
      }

      let simRating = this.pears.calcPear(
        ld.userandratings[user],
        ld.userandratings[userB.UserId]
      ).toFixed(4);

      simscore[userB.UserId] = simRating;
    }
    return simscore;
  }

  calcRecMovies(user, simscores, ld) {
    //felet är för att notSeen innehåller referenser till objekten som finns i ld.movies
    let notSeen = [];
    notSeen = JSON.parse(JSON.stringify(ld.movies.filter((movie) => {
      if(ld.userandratings[user].userRatings.some(rating => rating.movieId === movie.MovieId)){
        return false
      }
      return true;
    })));


    for (const userB of ld.users) {
      if (userB.UserId == user || simscores[userB.UserId] <= 0) {
        continue;
      }
  
      for(let i = 0; i < notSeen.length; i++) {
        let mov = ld.userandratings[userB.UserId].userRatings.find(
          (rat) => rat.movieId == notSeen[i].MovieId
        );

        if (mov) {
          let wUserScore = parseFloat(simscores[userB.UserId]);
          let calcSum = (wUserScore * mov.rating);
          notSeen[i].wSum += parseFloat(calcSum);
          notSeen[i].wUserScore += parseFloat(wUserScore);
        }
      }
    }

    for(let k = 0; k < notSeen.length; k ++){
      notSeen[k].recScore = parseFloat(notSeen[k].wSum) / parseFloat(notSeen[k].wUserScore);
    }

    return notSeen;
  }
}

module.exports = Calculator;
