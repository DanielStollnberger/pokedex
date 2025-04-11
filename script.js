let dbURL = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';

function loadBody() {
    getData();
}

async function getData() {
    let response = await fetch(dbURL + '.json');
    let data = await response.json();
    showTemplate(data);
}

async function showTemplate(data) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';

    // for (let i = 0; i < 1; i++) {
    for (let i = 0; i < data.results.length; i++) {

        let pokemonResponse = await fetch(data.results[i].url);
        let pokemonData = await pokemonResponse.json();
        // console.log(pokemonData);

        contentRef.innerHTML += `<div class='card' onclick='showCard(${i})'>
                                    <div class='card-header'>
                                        <h2>#${pokemonData.id}</h2>
                                        <h2>${pokemonData.species.name}</h2>
                                        <h2></h2>
                                    </div>
                                    <img src='${pokemonData.sprites.front_default}' class='card-img' id='card-img-${i}'>
                                    <div class='card-footer' id='type-${i}'>
                                        
                                    </div>
                                </div>`;


        let typeRef = document.getElementById(`type-${i}`);
        typeRef.innerHTML = '';

        for (let j = 0; j < pokemonData.types.length; j++) {

            let typeResponse = await fetch(pokemonData.types[j].type.url);
            let typeData = await typeResponse.json();
            // console.log(typeData);

            let value = pokemonData.types[0].type.name;
            switchFunc(value, i);


            typeRef.innerHTML += `<img src='${typeData.sprites['generation-vii']['lets-go-pikachu-lets-go-eevee'].name_icon}' class='type-img'>`;
        }
    }
}

async function showCard(i) {
    let response = await fetch(dbURL + '.json');
    let data = await response.json();
    let pokemonResponse = await fetch(data.results[i].url);
    let pokemonData = await pokemonResponse.json();
    let popupRef = document.getElementById('popup-div');
    popupRef.innerHTML = `<div class='popup-card'>
                                <div class='card-header'>
                                    <h2>#${pokemonData.id}</h2>
                                    <h2>${pokemonData.species.name}</h2>
                                    <button onclick='closePopup()'>X</button>
                                </div>
                                <img src='${pokemonData.sprites.front_default}' class='popup-card-img' id='card-img-${i}'>
                                <div class='popup-card-type' id='type-${i}'>
                                </div>
                                <div class='popup-nav'>
                                    <div class='popup-nav-element'>main</div>
                                    <div class='popup-nav-element'>stats</div>                                        <div class='popup-nav-element'>evo</div>
                                </div>
                                <div class='popup-info' id='popup-info-${i}'>
                                </div>
                          </div>`;
    popupRef.classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup-div').classList.add('hidden');
}

function switchFunc(value, i) {
    switch (value) {
        case 'grass':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px green)';
            break;
        case 'fire':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px red)';
            break;
        case 'water':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px blue)';
            break;
        case 'bug':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightgreen)';
            break;
        case 'normal':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px white)';
            break;
        case 'poison':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px purple)';
            break;
        case 'electric':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px yellow)';
            break;
        case 'ground':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px peru)';
            break;
        case 'fairy':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px pink)';
            break;
        case 'fighting':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightpink)';
            break;
        case 'psychic':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px violet)';
            break;
        case 'rock':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px grey)';
            break;
        case 'ghost':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px slateblue)';
            break;
        case 'ice':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightblue)';
            break;
        case 'dragon':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px cadetblue)';
            break;
        case 'dark':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px darkblue)';
            break;
        case 'steel':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px darkgrey)';
            break;
        case 'stellar':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px crimson)';
            break;
        case 'flying':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px brown)';
            break;
        case 'unknown':
            document.getElementById(`card-img-${i}`).style.filter = 'drop-shadow(0 0 10px orange)';
            break;
        default:
            break;
    }
}
