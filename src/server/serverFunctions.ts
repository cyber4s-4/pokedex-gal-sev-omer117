import { Pokemon } from "src/client/shared/pokemon";
import fetch from 'cross-fetch';
import fs from 'fs';
import { Collection } from "mongodb";
import { addAllPokemon } from "./mongo";

// Write the data from the api to the data.json
export async function writeData(data: any, filePath: string, readFileData: JSON, collection: Collection<Pokemon>) {
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
  addAllPokemon(pokemonArr, collection);
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