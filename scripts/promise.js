async function promiseEvo(evoChainData, popupInfoRef) {
    if (evoChainData.chain.species) {
        
        let chainFirstEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.species.name);
        let chainFirstEvoData = await chainFirstEvoResponse.json();
       
        if (evoChainData.chain.evolves_to.length != []) {
            let chainSecondEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.evolves_to[0].species.name);
            let chainSecondEvoData = await chainSecondEvoResponse.json();
            
            if (evoChainData.chain.evolves_to[0].evolves_to.length != []) {
                let chainThirdEvoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + evoChainData.chain.evolves_to[0].evolves_to[0].species.name);
                let chainThirdEvoData = await chainThirdEvoResponse.json();
                popupInfoRef.innerHTML = evoTemmplate();
                document.getElementById('first-evo').innerHTML = `<img src='${chainFirstEvoData.sprites.front_default}' class='evo-img'>`;
                document.getElementById('second-evo').innerHTML = `<img src='${chainSecondEvoData.sprites.front_default}' class='evo-img'>`;
                document.getElementById('third-evo').innerHTML = `<img src='${chainThirdEvoData.sprites.front_default}' class='evo-img'>`;
            } else {
                popupInfoRef.innerHTML = evoTemmplate('two');
                document.getElementById('first-evo').innerHTML = `<img src='${chainFirstEvoData.sprites.front_default}' class='evo-img'>`;
                document.getElementById('second-evo').innerHTML = `<img src='${chainSecondEvoData.sprites.front_default}' class='evo-img'>`;
            }
        } else {
            popupInfoRef.innerHTML = evoTemmplate('one');
            document.getElementById('first-evo').innerHTML = `<img src='${chainFirstEvoData.sprites.front_default}' class='evo-img'>`;
        }
    } else {
        document.getElementById('first-evo').innerHTML = `<div><p>There is only one G</p></div>`;
    }
}