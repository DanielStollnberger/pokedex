function mainTemplate(pokemonData, i) {
    return `<div class='card' onclick='showCard(${i})'>
                <div class='card-header'>
                    <h2>#${pokemonData.id}</h2>
                    <h2>${pokemonData.species.name}</h2>
                    <h2></h2>
                </div>
                <img src='${pokemonData.sprites.front_default}' class='card-img' id='card-img-${i}'>
                <div class='card-footer' id='type-${i}'>     
                </div>
            </div>`
}

function popupTemplate(pokemonData, i) {
    return `<div class='popup-card'>
                                <div class='card-header card-header-1000px'>
                                    <h2>#${pokemonData.id}</h2>
                                    <h2>${pokemonData.species.name}</h2>
                                    <button onclick='closePopup()'>X</button>
                                </div>
                                <img src='${pokemonData.sprites.front_default}' class='popup-card-img' id='popup-card-img-${i}'>
                                <div class='popup-card-type' id='popup-type-${i}'>
                                </div>
                                <div class='popup-nav'>
                                    <div class='popup-nav-element' onclick='showStats("main",${i})' id='main-info'>main</div>
                                    <div class='popup-nav-element' onclick='showStats("stats",${i})' id='stats-info'>stats</div>                                        
                                    <div class='popup-nav-element' onclick='showStats("evo",${i})' id='evo-info'>evo</div>
                                </div>
                                <div class='popup-info' id='popup-info-${i}'>
                                </div>
                          </div>`
}

function mainInfoTemplate(pokemonData) {
    return `<div class='table-div'>
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
            </div>`
}

function statsTemplate(pokemonData) {
    return `<div class='bars-div'>
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
}

function evoTemmplate(evoValue) {
    if (evoValue == 'one') {
        return `<div class='evo-chain'>
                    <div class='evo-chain-img' id='first-evo'></div> 
                </div>`
    } else if (evoValue == 'two') {
        return `<div class='evo-chain'>
                    <div class='evo-chain-img' id='first-evo'></div>  
                        <div class='svg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="25">
                            <polygon points="5,10 95,50 5,90" fill="white">
                            <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" />
                            <animate attributeName="transform" type="scale" from="0" to="1" dur="1s" begin="0s" />
                            </polygon>
                        </svg></div>
                    <div class='evo-chain-img' id='second-evo'></div>
                </div>`
    } else {
        return `<div class='evo-chain'>
                    <div class='evo-chain-img' id='first-evo'></div>  
                        <div class='svg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="25">
                            <polygon points="5,10 95,50 5,90" fill="white">
                            <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" />
                            <animate attributeName="transform" type="scale" from="0" to="1" dur="1s" begin="0s" />
                            </polygon>
                        </svg></div>
                    <div class='evo-chain-img' id='second-evo'></div>
                        <div class='svg' id='svg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="25">
                            <polygon points="5,10 95,50 5,90" fill="white">
                            <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" />
                            <animate attributeName="transform" type="scale" from="0" to="1" dur="1s" begin="0s" />
                            </polygon>
                        </svg></div>
                    <div class='evo-chain-img' id='third-evo'></div>
                </div>`
    }
}