import path from 'path';
import fs from 'fs';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Pokemon } from 'src/client/shared/pokemon';
import fetch from 'cross-fetch';
import { connect, create, getPokemonsDB } from './mongo';
import { Collection } from 'mongodb';
import { writeData, handleJson, filePath } from './serverFunctions';

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

let collection: Collection<Pokemon>;
connect(create()).then(res => collection = res);

app.use(express.static(root), (_req, _res, next) => {
    next();
});

// Run to get the data from the api and write it to the database
app.get('/writeToMongo', (_req, res) => {
    console.log("getting api to database");
    res.sendFile(path.join(root, 'index.html'));
    let pokemon_url =  "http://127.0.0.1:4000/getDataJson";
    fetch(pokemon_url)
      .then(res => res.json())
      .then(pokemonsData => writeData(pokemonsData, collection))
      .catch(err => console.log(err));
});

// Run to write the data from the api and to the data.json
app.get('/writeDataJson', (_req, res) => {
  console.log("writing api to data json");
  res.sendFile(path.join(root, 'index.html'));
  handleJson();
});

// Run to get the data from data.json
app.get('/getDataJson', (_req, res) => {
  console.log("getting api from data json");
  res.send(JSON.parse(fs.readFileSync(filePath, "utf8")));
});

// Run to get 100 pokemons based on the page
app.get("/getData/page=:page", (req, res) => {
  getPokemonsDB(collection, res, Number(req.params.page));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
