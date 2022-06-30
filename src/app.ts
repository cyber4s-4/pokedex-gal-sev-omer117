import { Pokemon } from "./shared/pokemon";

let pokeEntriesFetch = fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => handleData(data))
    .then(() => {
        console.log(pokemonArr);
        updatePokemonHtml();
    });

let pokemonArr: Pokemon[] = [];
let input_label = document.getElementById("pokemonSearchLabel") as HTMLLabelElement;
input_label.addEventListener("click", updatePokemonHtml);

let currentMaxPage = 1;
window.addEventListener("scroll", () => {
    if((currentMaxPage === 1 && window.scrollY >= currentMaxPage * 280) || window.scrollY >= 200 + (950 * (currentMaxPage-1))) {
        currentMaxPage++;
        updatePokemonHtml();
    }
});

async function handleData(data: any) {
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        //fetch extra data about the pokemon from its specific api
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/"  + pokeEntriesData[i].entry_number;
        await fetch(pokemon_url)
            .then(res => res.json())
            .then(infoData => {          
                let pokemon_types: string[] = [];
                for (let i = 0; i < infoData.types.length; i++) {
                    pokemon_types.push(infoData.types[i].type.name);
                }                
                pokemonArr.push(new Pokemon(
                    Number(pokeEntriesData[i].entry_number), 
                    pokeEntriesData[i].pokemon_species.name,
                    pokeEntriesData[i].pokemon_species.url,
                    infoData.sprites.front_default,
                    infoData.height,
                    infoData.weight,
                    infoData.stats[5].base_stat, //hp
                    infoData.stats[4].base_stat,//attack
                    infoData.stats[3].base_stat, //defense
                    pokemon_types
                    ));
            });
        
    }
}

function filterByName() {
    let input_value = (<HTMLInputElement>document.getElementById("pokemonSearch")).value;
    let filteredArr: Pokemon[] = [];
    for (let i = 0; i < pokemonArr.length; i++) {
        if (pokemonArr[i].name.includes(input_value)) {
            filteredArr.push(pokemonArr[i]);
        }
    }
    return filteredArr;
}

function updatePokemonHtml() {
    let filteredArr = filterByName();
    let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
    pokemonList.innerHTML = "";
    for (let i = 0; i < currentMaxPage*20 && i < filteredArr.length; i++) {        
        filteredArr[i].createPokeElement();
    }
}



