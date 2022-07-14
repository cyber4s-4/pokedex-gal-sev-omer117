import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Pokemon } from 'src/client/shared/pokemon';
import fetch from 'cross-fetch';
import fs from 'fs';

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

let readFileData: JSON = JSON.parse("[]");

const filePath = path.join(__dirname, "./data/data.json");
const folderPath = path.join(__dirname, "./data");

if(fs.existsSync(folderPath)) {
  console.log("folder exists");
} else {
  fs.mkdirSync(folderPath);
}

if(fs.existsSync(filePath)) {
  console.log("file exists");
  readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
} else {
  console.log("data.json doesn't exist, getting api to data.json");
    fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => writeData(data))
}

app.use(express.static(root), (_req, _res, next) => {
    next();
});

// Run to get the data from the api and write it to data.json
app.get('/getApi', (_req, res) => {
    console.log("getting api");
    res.sendFile(path.join(root, 'index.html'));
    fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => writeData(data))
});

// Write the data from the api to the data.json
async function writeData(data: any) {
    let pokemonArr: Pokemon[] = [];
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        let pokemon_url =  "https://pokeapi.co/api/v2/pokemon/" + pokeEntriesData[i].pokemon_species.name;
            await fetch(pokemon_url)
                .then(res => res.json())
                .then(infoData => handleInfoData(i, pokeEntriesData, infoData, pokemonArr))
                .catch(err => console.log(err));
    }
    console.log("Finished loading api to json");
    await fs.writeFileSync(filePath, JSON.stringify(pokemonArr));
    readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Adds each pokemon to the array
function handleInfoData(index: number, pokeEntriesData: any, infoData: any, pokemonArr: object[]) {
    console.log("Pokemon number: " + index);
    let types: string[] = [];
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

app.get("/getData", (_req, res) => {
    res.status(200).send(readFileData);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
