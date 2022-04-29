
class PageDB {

    pages = []
    wordToId = new Map()

    getIdForWord = (word) => {
        if(this.wordToId.has(word)) {
            return this.wordToId.get(word)
        } else {
            let id = this.wordToId.size
            this.wordToId.set(word, id)
            return id
        }
    
    }

    addPage = (page) => {
        this.pages.push(page)
    }

    getPages = () => {
        return this.pages
    }

}

module.exports = PageDB