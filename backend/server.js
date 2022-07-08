const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const portHttp = 4002;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, "./data/data.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

const root = path.join(process.cwd(), 'dist');
app.use(express.static(root), (req, res, next) => {
    next();
});

// Run to get the data from the api and write it to data.json
app.get('/getApi', (req, res) => {
    console.log("getting api");
    res.sendFile(path.join(root, 'index.html'));
    fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => writeData(data))
});

// Write the data from the api to the data.json
async function writeData(data) {
    let pokemonArr = [];
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        let pokemon_url =  "https://pokeapi.co/api/v2/pokemon/" + pokeEntriesData[i].pokemon_species.name;
            await fetch(pokemon_url)
                .then(res => res.json())
                .then(infoData => handleInfoData(i, pokeEntriesData, infoData, pokemonArr))
                .catch(err => console.log(err));
    }
    console.log("Finished loading api to json");
    fs.writeFileSync(filePath, JSON.stringify(pokemonArr));
}

// Adds each pokemon to the array
function handleInfoData(index, pokeEntriesData, infoData, pokemonArr) {
    console.log("Pokemon number: " + index);
    types = [];
    for (let i = 0; i < infoData.types.length; i++) {
        types.push(infoData.types[i].type.name);
    }
    pokemonArr.push(
            {
                id: Number(pokeEntriesData[index].entry_number), 
                name: pokeEntriesData[index].pokemon_species.name,
                url: pokeEntriesData[index].pokemon_species.url,
                img: infoData.sprites.front_default,
                height: infoData.height,
                weight: infoData.weight,
                hp: infoData.stats[5].base_stat, //hp
                attack: infoData.stats[4].base_stat, //attack
                defense: infoData.stats[3].base_stat, //defense
                types: types,
            });
}

app.get("/getData", (req, res) => {
    res.status(200).send(readFileData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});

