const URL = 'http://localhost:3000/search'

let searchForm = document.getElementById('searchform')

let table = document.getElementById('table')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let query = document.getElementById('query').value
    fetch(`${URL}/${query}`)
        .then((response) => response.json())
        .then((data) => {
            renderResult(data)
        })
})

const renderResult = (data) => {
    let displayData = data.slice(-5).reverse()
    table.innerHTML = ''

    if(displayData.length == 0){
        table.innerHTML += "<bold>Nothing found!</bold>"
    }
    for (let i = 0; i < displayData.length; i++) {
        table.innerHTML += `<tr>
            <td>${displayData[i].url}</td>
            <td>${displayData[i].score.toFixed(2)}</td>
            <td>${displayData[i].content.toFixed(2)}</td>
            <td>${displayData[i].location.toFixed(2)}</td>
        </tr>`
    }
}
