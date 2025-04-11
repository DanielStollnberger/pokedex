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

    for (let i = 0; i < data.results.length; i++) {

        let pokemonResponse = await fetch(data.results[i].url);
        let pokemonData = await pokemonResponse.json();
        contentRef.innerHTML += mainTemplate(pokemonData, i);

        let typeRef = document.getElementById(`type-${i}`);
        typeRef.innerHTML = '';

        for (let j = 0; j < pokemonData.types.length; j++) {

            let typeResponse = await fetch(pokemonData.types[j].type.url);
            let typeData = await typeResponse.json();

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

    popupRef.innerHTML = popupTemplate(pokemonData, i);

    let typeRef = document.getElementById(`popup-type-${i}`);
    typeRef.innerHTML = '';

    for (let j = 0; j < pokemonData.types.length; j++) {

        let typeResponse = await fetch(pokemonData.types[j].type.url);
        let typeData = await typeResponse.json();
        // console.log(typeData);

        let value = pokemonData.types[0].type.name;
        switchFuncPopup(value, i);

        typeRef.innerHTML += `<img src='${typeData.sprites['generation-vii']['lets-go-pikachu-lets-go-eevee'].name_icon}' class='popup-type-img'>`;
    }

    popupRef.classList.remove('hidden');
    document.getElementById('content').classList.add('bright');
}

function closePopup() {
    document.getElementById('popup-div').classList.add('hidden');
    document.getElementById('content').classList.remove('bright');
}

async function showStats(whichStat, i) {

    let response = await fetch(dbURL + '.json');
    let data = await response.json();
    let pokemonResponse = await fetch(data.results[i].url);
    let pokemonData = await pokemonResponse.json();
    let evoResponse = await fetch(pokemonData.species.url);
    let evoData = await evoResponse.json();
    let evoChainResponse = await fetch(evoData.evolution_chain.url);
    let evoChainData = await evoChainResponse.json()

    let popupInfoRef = document.getElementById(`popup-info-${i}`);
    popupInfoRef.innerHTML = '';
    
    if (whichStat == 'main') {
        popupInfoRef.innerHTML = mainInfoTemplate(pokemonData);

        let abilitiesRef = document.getElementById('abilities');

        for (let j = 0; j < pokemonData.abilities.length; j++) {
            abilitiesRef.innerHTML += `<li>${pokemonData.abilities[j].ability.name}</li>`;
        }

    } else if (whichStat == 'stats') {

        popupInfoRef.innerHTML = statsTemplate(pokemonData);

    } else if (whichStat == 'evo') {
        popupInfoRef.innerHTML = evoTemmplate();

        promiseEvo(evoChainData);
    }
}

