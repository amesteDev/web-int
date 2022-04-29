class Euc {
  calcEuclidean = (usera, userb) => {
    let sim = 0;
    let n = 0;

    for (let i = 0; i < usera.userRatings.length; i++) {
      for (let k = 0; k < userb.userRatings.length; k++) {
        if (usera.userRatings[i].movieId == userb.userRatings[k].movieId) {
          sim += Math.pow(
            usera.userRatings[i].rating - userb.userRatings[k].rating,
            2
          );
          n += 1;
        }
      }
    }

    if (n == 0) {
      return 0;
    }

    let inv = 1 / (1 + sim);

    return inv;
  };
}

module.exports = Euc;
