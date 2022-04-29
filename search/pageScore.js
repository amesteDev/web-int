class PageScore {
    wordFreq = (page, words) => {
        let score = 0

        for (let i = 0; i < words.length; i++) {
            for (let k = 0; k < page.words.length; k++) {
                if (words[i] === page.words[k]) {
                    score += 1
                }
            }
        }

        return score
    }

    docuLoc = (page, words) => {
        let score = 0
        for (let i = 0; i < words.length; i++) {
            let found = false
            for (let k = 0; k < page.words.length; k++) {
                if (words[i] === page.words[k]) {
                    score += k + 1
                    found = true
                    break
                }
            }
            if (!found) {
                score += 100000
            }
        }
        return score
    }

    normalize = (scores, small) => {
        if (small) {
            let minVal = Math.min(...scores)

            for (let i = 0; i < scores.length; i++) {
                scores[i] = minVal / Math.max(scores[i], 0.00001)
            }
        } else {
            let maxVal = Math.max(...scores)

            maxVal = Math.max(maxVal, 0.00001)

            for (let i = 0; i < scores.length; i++) {
                scores[i] = scores[i] / maxVal
            }
        }
    }
}

module.exports = PageScore