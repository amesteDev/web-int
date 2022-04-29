const express = require('express')
const router = express.Router()

const app = express()
const cors = require('cors')

const loader = require('./dataindexer/indexer')
let indexer = new loader()

const searchEngine = require('./searchQuery')
let searcher = new searchEngine()

app.use(cors())
app.use(express.static(__dirname + '/static/'))

app.use('/', router)

app.get('/search/:query', (req, res) => {
    let matches = searcher.findMatches(req.params.query, data)

    //console.log(matches)
    res.json(matches)
})

const PORT = process.env.PORT || 3000

let data

const load = async () => {
    data = await indexer.openFile()
}

app.listen(PORT, () => {
    load()
    console.log('Server is running on port: ' + PORT)
})
