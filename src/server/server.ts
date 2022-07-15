import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Pokemon } from 'src/client/shared/pokemon';
import fetch from 'cross-fetch';
import { connect, create, getPokemonsDB } from './mongo';
import { Collection } from 'mongodb';
import { writeData } from './serverFunctions';

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

// Run to get the data from the api and write it to data.json
app.get('/getApi', (_req, res) => {
    console.log("getting api");
    res.sendFile(path.join(root, 'index.html'));
    fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => writeData(data, collection));
});

app.get("/getData", (_req, res) => {
  getPokemonsDB(collection, res);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
