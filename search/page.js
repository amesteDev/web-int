class Page {
    url = ""
    words = []

    constructor(name) {
        this.url = name
    }

    addWord = (word) => {
        this.words.push(word)
    }

}

module.exports = Page

/*
Implement the PageRank algorithm and use it to rank the search results.
Run the algorithm for 20 iterations.
Results shall be ranked using:
score = word_frequency + 0.8 * document_location + 0.5 * pagerank
Display the top five search results with page and rank score.
*/