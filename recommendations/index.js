const express = require("express");
const router = express.Router();

const app = express();
const loader = require("./fileloader/loading");
const calc = require("./ratings/calc");

const ld = new loader([], [], []);
const calculator = new calc();
const cors = require('cors')
app.use(cors());
app.use(express.static(__dirname + "/static/"));

app.use("/", router)

router.get('/calc/euc/:id',(req, res) => {
    let result = calculator.calcEuc(req.params.id, ld);
    let movies = calculator.calcRecMovies(req.params.id, result, ld);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(movies));
})

app.get('/calc/pears/:id', (req, res) => {
  let result = calculator.calcPearson(req.params.id, ld);
  let movies = calculator.calcRecMovies(req.params.id, result, ld);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(movies));
})

app.get('/users', (req, res) => {
  res.send(ld.users);
})

const PORT = process.env.PORT || 3000;

ld.readUserCsv(() => {
  ld.readRatingsCsv(() => {
    ld.readMoviesCsv(() => {
      app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
      });
    });
  });
});