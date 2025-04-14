let dbURL1 = 'https://pokeapi.co/api/v2/pokemon?limit=';
let limit = 50;
let dbURL2 = '&offset=0';
let allPokemonData = null;



function loadBody() {
    getData();
}

async function getData() {
    let response = await fetch(getDbURL() + '.json');
    let data = await response.json();
    allPokemonData = data;
    showTemplate(data)
}

async function showTemplate(data) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    let loadingRef = document.getElementById('preloader');
    loadingRef.classList.remove('hidden');

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

    loadingRef.classList.add('hidden');

}

async function showCard(i) {
    let response = await fetch(getDbURL() + '.json');
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

        let value = pokemonData.types[0].type.name;
        switchFuncPopup(value, i);

        typeRef.innerHTML += `<img src='${typeData.sprites['generation-vii']['lets-go-pikachu-lets-go-eevee'].name_icon}' class='popup-type-img'>`;
    }

    popupRef.classList.remove('hidden');
    document.getElementById('content').classList.add('bright');

    let popupInfoRef = document.getElementById(`popup-info-${i}`);
    popupInfoRef.innerHTML = '';
    popupInfoRef.innerHTML = mainInfoTemplate(pokemonData);
    document.getElementById('main-info').classList.add('border-bottom');
    let abilitiesRef = document.getElementById('abilities');
    for (let j = 0; j < pokemonData.abilities.length; j++) {
        abilitiesRef.innerHTML += `<li>${pokemonData.abilities[j].ability.name}</li>`;
    }
}

function closePopup() {
    document.getElementById('popup-div').classList.add('hidden');
    document.getElementById('content').classList.remove('bright');
}

async function showStats(whichStat, i) {
    let response = await fetch(getDbURL() + '.json');
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
        document.getElementById('main-info').classList.add('border-bottom');
        document.getElementById('stats-info').classList.remove('border-bottom');
        document.getElementById('evo-info').classList.remove('border-bottom');
        let abilitiesRef = document.getElementById('abilities');
        for (let j = 0; j < pokemonData.abilities.length; j++) {
            abilitiesRef.innerHTML += `<li>${pokemonData.abilities[j].ability.name}</li>`;
        }
    } else if (whichStat == 'stats') {
        document.getElementById('main-info').classList.remove('border-bottom');
        document.getElementById('stats-info').classList.add('border-bottom');
        document.getElementById('evo-info').classList.remove('border-bottom');
        popupInfoRef.innerHTML = statsTemplate(pokemonData);
    } else if (whichStat == 'evo') {
        document.getElementById('main-info').classList.remove('border-bottom');
        document.getElementById('stats-info').classList.remove('border-bottom');
        document.getElementById('evo-info').classList.add('border-bottom');
        promiseEvo(evoChainData, popupInfoRef);


    }
}

async function search() {

    let searchInput = document.getElementById('searchbar').value.toLowerCase();
    if (document.getElementById('searchbar').value.length >= 2) {
        document.getElementById('search-p').classList.add('hidden');
        let response = await fetch(getDbURL());
        let data = await response.json();
        let contentRef = document.getElementById('content');
        contentRef.innerHTML = '';

        for (let i = 0; i < data.results.length; i++) {
            let name = data.results[i].name.toLowerCase();

            if (name.includes(searchInput)) {
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
    } else {
        document.getElementById('search-p').classList.remove('hidden');
        showTemplate(allPokemonData);
    }
}

function loadMoreContent() {
    limit += 50;
    getData();
}

function getDbURL() {
    return dbURL1 + `${limit}` + dbURL2;
}