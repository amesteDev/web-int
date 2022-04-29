const PageScore = require('./pageScore')
const Scores = require('./scores')
let ps = new PageScore()

class SearchQuery {
    findMatches = (query, pageDB) => {
        let result = []
        let score = new Scores()
        let words = query.split(' ')

        for (let word in words) {
            words[word] = pageDB.wordToId.get(words[word])
        }

        for (let i = 0; i < pageDB.pages.length; i++) {
            score.content[i] = ps.wordFreq(pageDB.pages[i], words)
            score.location[i] = ps.docuLoc(pageDB.pages[i], words)
        }

        ps.normalize(score.content, false)
        ps.normalize(score.location, true)

        for (let k = 0; k < pageDB.pages.length; k++) {
            if (score.content[k] > 0) {
                result.push({
                    url: pageDB.pages[k].url,
                    score: score.content[k] + 0.8 * score.location[k],
                    content: score.content[k],
                    location: score.location[k] * 0.8,
                })
            }
        }

        result.sort((a, b) => {
            return a.score - b.score
        })

        return result
    }
}

module.exports = SearchQuery