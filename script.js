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

    // for (let i = 0; i < 5; i++) {
    for (let i = 0; i < data.results.length; i++) {

        let pokemonResponse = await fetch(data.results[i].url);
        let pokemonData = await pokemonResponse.json();
        console.log(pokemonData);

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
                                <img src='${pokemonData.sprites.front_default}' class='popup-card-img' id='popup-card-img-${i}'>
                                <div class='popup-card-type' id='popup-type-${i}'>
                                </div>
                                <div class='popup-nav'>
                                    <div class='popup-nav-element' onclick='showStats("main",${i})'>main</div>
                                    <div class='popup-nav-element' onclick='showStats("stats",${i})'>stats</div>                                        
                                    <div class='popup-nav-element' onclick='showStats("evo",${i})'>evo</div>
                                </div>
                                <div class='popup-info' id='popup-info-${i}'>
                                </div>
                          </div>`;

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

    let popupInfoRef = document.getElementById(`popup-info-${i}`);
    popupInfoRef.innerHTML = '';
    if (whichStat == 'main') {
        popupInfoRef.innerHTML = `<div class='table-div'>
                                    <table>
                                        <tr>
                                            <td>Height: </td>
                                            <td>${(pokemonData.height / 10).toFixed(1) + " m"}</td>
                                        </tr>
                                        <tr>
                                            <td>Weight: </td>
                                            <td>${(pokemonData.weight / 10).toFixed(1) + " kg"}</td>
                                        </tr>
                                        <tr>
                                            <td>Base-experience: </td>
                                            <td>${pokemonData.base_experience}</td>
                                        </tr>
                                        <tr>
                                            <td>Abilities: </td>
                                            <td id='abilities'></td>
                                        </tr>
                                    </table>
                                </div>`;

        let abilitiesRef = document.getElementById('abilities');

        for (let j = 0; j < pokemonData.abilities.length; j++) {
            abilitiesRef.innerHTML += `<li>${pokemonData.abilities[j].ability.name}</li>`;
        }

    } else if (whichStat == 'stats') {

        popupInfoRef.innerHTML = `<div class='bars-div'>
                                    HP
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[0].base_stat}%;">
                                        </div>
                                    </div>
                                    Attack
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[1].base_stat}%;">
                                        </div>
                                    </div>
                                    Defense
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[2].base_stat}%;">
                                        </div>
                                    </div>
                                </div>
                                <div class='bars-div'>
                                    Special-attack
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[3].base_stat}%;">
                                        </div>
                                    </div>
                                    Special-defense
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[4].base_stat}%;">
                                        </div>
                                    </div>
                                    Speed
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${pokemonData.stats[5].base_stat}%;">
                                        </div>
                                    </div>
                                </div>`;

    } else if (whichStat == 'evo') {
        let evoResponse = await fetch(pokemonData.species.url);
        let evoData = await evoResponse.json();
        let evoChainResponse = await fetch(evoData.evolution_chain.url);
        let evoChainData = await evoChainResponse.json()

        popupInfoRef.innerHTML = `<div class='evo-chain'>
                                    <div class='evo-chain-img' id='first-evo'></div>  
                                        <div class='svg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="25">
                                            <polygon points="5,10 95,50 5,90" fill="white">
                                            <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" />
                                            <animate attributeName="transform" type="scale" from="0" to="1" dur="1s" begin="0s" />
                                            </polygon>
                                        </svg></div>
                                    <div class='evo-chain-img' id='second-evo'></div>
                                        <div class='svg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="25">
                                            <polygon points="5,10 95,50 5,90" fill="white">
                                            <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" />
                                            <animate attributeName="transform" type="scale" from="0" to="1" dur="1s" begin="0s" />
                                            </polygon>
                                        </svg></div>
                                    <div class='evo-chain-img' id='third-evo'></div>
                                </div>`;

        new Promise(async (resolve, reject) => {

            if (evoChainData.chain.species) {
                resolve()
                let chainFirstEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.species.name);
                let chainFirstEvoData = await chainFirstEvoResponse.json();
                document.getElementById('first-evo').innerHTML = `<img src='${chainFirstEvoData.sprites.front_default}' style='border: 1px solid rgba(255, 255, 255, 0.116);border-radius: 10px;'>`;
                if (evoChainData.chain.evolves_to[0].species) {
                    resolve()
                    let chainSecondEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.evolves_to[0].species.name);
                    let chainSecondEvoData = await chainSecondEvoResponse.json();
                    document.getElementById('second-evo').innerHTML = `<img src='${chainSecondEvoData.sprites.front_default}' style='border: 1px solid rgba(255, 255, 255, 0.116);border-radius: 10px;'>`;
                    if (evoChainData.chain.evolves_to[0].evolves_to[0].species) {
                        resolve()
                        let chainThirdEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.evolves_to[0].evolves_to[0].species.name);
                        let chainThirdEvoData = await chainThirdEvoResponse.json();
                        document.getElementById('third-evo').innerHTML = `<img src='${chainThirdEvoData.sprites.front_default}' style='border: 1px solid rgba(255, 255, 255, 0.116);border-radius: 10px;'>`;
                    } else {
                        reject()
                    }
                } else {
                    reject()
                }
            } else {
                reject();
            }
        })



    }
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

function switchFuncPopup(value, i) {
    switch (value) {
        case 'grass':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px green)';
            break;
        case 'fire':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px red)';
            break;
        case 'water':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px blue)';
            break;
        case 'bug':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightgreen)';
            break;
        case 'normal':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px white)';
            break;
        case 'poison':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px purple)';
            break;
        case 'electric':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px yellow)';
            break;
        case 'ground':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px peru)';
            break;
        case 'fairy':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px pink)';
            break;
        case 'fighting':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightpink)';
            break;
        case 'psychic':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px violet)';
            break;
        case 'rock':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px grey)';
            break;
        case 'ghost':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px slateblue)';
            break;
        case 'ice':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px lightblue)';
            break;
        case 'dragon':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px cadetblue)';
            break;
        case 'dark':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px darkblue)';
            break;
        case 'steel':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px darkgrey)';
            break;
        case 'stellar':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px crimson)';
            break;
        case 'flying':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px brown)';
            break;
        case 'unknown':
            document.getElementById(`popup-card-img-${i}`).style.filter = 'drop-shadow(0 0 10px orange)';
            break;
        default:
            break;
    }
}