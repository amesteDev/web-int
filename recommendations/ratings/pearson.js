class Pearson {

    calcPear(usera, userb) {
        let sum1 = 0;
        let sum2 = 0;
        let sum1sq = 0;
        let sum2sq = 0;
        let pSum = 0;
        let n = 0;

        for (let i = 0; i < usera.userRatings.length; i++) {
            for (let k = 0; k < userb.userRatings.length; k++) {
                if (usera.userRatings[i].movieId == userb.userRatings[k].movieId) {
                    let userARating = parseFloat(usera.userRatings[i].rating)
                    let userBRating = parseFloat(userb.userRatings[k].rating)
                    sum1 += userARating
                    sum2 += userBRating 
                    sum1sq += Math.pow(userARating, 2)
                    sum2sq += Math.pow(userBRating , 2)
                    pSum += userARating * userBRating 
                    n += 1
                }
            }
        }

        if (n == 0) {
            return 0;
        }

        let num = pSum - (sum1 * sum2 / n)
        
        let den = Math.sqrt((sum1sq - Math.pow(sum1, 2) / n) * (sum2sq - Math.pow(sum2, 2) / n));
       
        return num / den;
    }
}

module.exports = Pearson;