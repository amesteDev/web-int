const fsp = require('fs').promises
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

const Page = require('../page')
const PageDB = require('../pageDB')
let pageDB = new PageDB()

class Indexer {


    parseFile = async (name, file) => {
        let page = new Page(name)
        try {
            const splitFile = fs.readFileSync(file, 'utf8').split(' ')


            for (let i = 0; i < splitFile.length; i++) {
                page.addWord(pageDB.getIdForWord(splitFile[i]))
            }
        } catch (err) {
            console.error(err)
        }

        return page
    }

    openFile = async (directoryName = './dataindexer/wikipedia/Words') => {
        let files = await fsp.readdir(directoryName, { withFileTypes: true })
        for (let f of files) {
            let fullPath = path.join(directoryName, f.name)

            if (f.isDirectory()) {
                await this.openFile(fullPath)
            } else {
                let page = await this.parseFile(f.name, fullPath)
                pageDB.addPage(page)
            }
        }
        resolve()
        return pageDB
    }
}

module.exports = Indexer
