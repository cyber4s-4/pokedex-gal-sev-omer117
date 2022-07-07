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

const root = path.join(process.cwd(), 'test');
app.use(express.static(root), (req, res, next) => {
    next();
});

app.get('/getApi', (req, res) => {
    console.log("getting api");
    res.sendFile(path.join(root, 'index.html'));
    fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => writeData(data))
});

function writeData(data) {
    let pokemonArr = [];
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/" + pokeEntriesData[i].pokemon_species.name;
        fetch(pokemon_url)
            .then(res => res.json())
            .then(infoData => handleInfoData(pokeEntriesData, infoData, pokemonArr));
    }
    fs.writeFileSync(filePath, JSON.stringify(pokemonArr));
}

function handleInfoData(pokeEntriesData, infoData, pokemonArr) {
    types = [];
    for (let i = 0; i < infoData.types.length; i++) {
        types.push(infoData.types[i].type.name);
    }
    pokemonArr.push(
            {
                id: Number(pokeEntriesData[i].entry_number), 
                name: pokeEntriesData[i].pokemon_species.name,
                url: pokeEntriesData[i].pokemon_species.url,
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

// app.get('*', (req, res) => {
//   console.log("test");
//   res.sendFile(path.join(root, 'index.html'));
// });

app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});

