async function promiseEvo(evoChainData) {
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