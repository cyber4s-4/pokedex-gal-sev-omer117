import path from 'path';
import fs from 'fs';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import fetch from 'cross-fetch';
import { handleJson, filePath, writeData } from './serverFunctions';
import { Client } from 'pg'
import { selectPokemonTable } from './postgres';


export const client = new Client({
    // postgres://tedkxnpyxwvyoo:c2fcd6e14f55195b2c6aa0764dc8c805ab1872b1caf2ce136467700bc1ddac85@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d72jh2unpcnoqh
    // connectionString: process.env.DATABASE_URL, ssl: {
    connectionString: "postgres://obouinkanaffwp:e2a075ec8cc7236879aa106ec5cb89792055573c37f6ef5aba471eaa5fabbdde@ec2-44-206-214-233.compute-1.amazonaws.com:5432/d9rjae5ruit19h",  ssl: {
    rejectUnauthorized: false
    }
});

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

app.use(express.static(root), (_req, _res, next) => {
    next();
});

// Run to get the data from the data.json and write it to the database
app.get('/writeToPostgres', (_req, res) => {
    console.log("getting data.json to database");
    res.sendFile(path.join(root, 'index.html'));
    const port = process.env.PORT || 4000;
    let pokemon_url =  `http://localhost:${port}/getDataJson`;
    fetch(pokemon_url)
      .then(res => res.json())
      .then(pokemonsData => writeData(pokemonsData))
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
  console.log("HELLO");
  selectPokemonTable(client, res, Number(req.params.page));
});

app.get("/wtf", (_req, res) => {
  console.log("HELLO");
  res.send("HEY");
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

(async () => {

  await client.connect();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
  });
})()
  .catch
  (console.log)
