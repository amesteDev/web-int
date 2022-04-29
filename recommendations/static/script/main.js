const URL = 'http://localhost:3000';

let output = document.getElementById("output");
let userSelect = document.getElementById("user");
let amount = document.getElementById("amount").value;

fetch(`${URL}/users`)
    .then(response => response.json())
    .then(data => {
        data.forEach((data, key) => {
            userSelect[key] = new Option(data.Name, data.UserId);
        }) 
    });


const compare = (a, b) => {
    if(a.recScore < b.recScore) {
        return 1;
    }
    if(a.recScore > b.recScore) {
        return -1;
    }
    return 0;
}

const loadMovieRec = (measure, userid) => {

    fetch(`${URL}/calc/${measure}/${userid}`)
    .then(response => response.json())
    .then(data => {
        renderMovieRecs(amount, data.sort(compare));
    });
}

const renderMovieRecs = (amount, movieRecs) => {
    movietable.innerHTML = `
            <tr>
            <th>Movie</th>
            <th>ID</th>
            <th>Score</th>
            </tr>
        `
    for(let i = 0; i < amount; i++){
        movietable.innerHTML += `
        <tr> 
            <td>${movieRecs[i].Title}</td>
            <td>${movieRecs[i].MovieId}</td>
            <td>${movieRecs[i].recScore.toFixed(4)}</td>
        </tr>`;
    }
}

let measaureAlgo = document.getElementById("measure");
let userToFetch = document.getElementById("user");
let amountToDisplay = document.getElementById("amount");

measaureAlgo.addEventListener("change", () => {
    loadMovieRec(measaureAlgo.value, userToFetch.value)
});

userToFetch.addEventListener("change", () => { 
    loadMovieRec(measaureAlgo.value, userToFetch.value)
});

amountToDisplay.addEventListener("change", () => {
    amount = document.getElementById("amount").value;

    loadMovieRec(measaureAlgo.value, userToFetch.value);
})