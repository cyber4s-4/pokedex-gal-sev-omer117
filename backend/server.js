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
// const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

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
        pokemonArr.push(
            {
                id: Number(pokeEntriesData[i].entry_number), 
                name: pokeEntriesData[i].pokemon_species.name,
                url: pokeEntriesData[i].pokemon_species.url
            });
    }
    fs.writeFileSync(filePath, JSON.stringify(pokemonArr));
}

app.get('*', (req, res) => {
  console.log("test");
  res.sendFile(path.join(root, 'index.html'));
});

app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});

