
let pokeEntriesData = fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => handleData(data));

let pokemonArr: Pokemon[] = [];

function handleData(data: any) {
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        pokemonArr.push(new Pokemon(
            Number(pokeEntriesData[i].entry_number), 
            pokeEntriesData[i].pokemon_species.name,
            pokeEntriesData[i].pokemon_species.url));
    }  
    
}

console.log(pokemonArr);


class Pokemon {
    id;
    name;
    url;

    constructor(id: number, name: string, url: string) {
        this.id = id;
        this.name = name;
        this.url = url;
        // this.generation = generation;

    }
}

