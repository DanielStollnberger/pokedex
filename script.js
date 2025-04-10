let dbURL = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';

function loadBody() {
    getData();
}

async function getData() {
    let response = await fetch(dbURL + '.json');
    let data = await response.json();
    console.log(data);
    showTemplate(data);
}

function showTemplate(data) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML='';

    for (let i = 0; i < data.results.length; i++) {
        contentRef.innerHTML += `<div class='card'>
                                <h2>${data.results[i].name}</h2>
                                <img src='' class='card-img'>
                                </div>`;
    }
}