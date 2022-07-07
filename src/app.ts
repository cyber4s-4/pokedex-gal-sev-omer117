import { Pokemon } from "./shared/pokemon";

fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => handleData(data));

let pokemonArr: Pokemon[] = [];
let input_label = document.getElementById("pokemonSearchLabel") as HTMLLabelElement;
input_label.addEventListener("click", updatePokemonHtml);

// Pagination event handler
let currentMaxPage = 1;
window.addEventListener("scroll", () => {
    if((currentMaxPage === 1 && window.scrollY >= currentMaxPage * 1700) || window.scrollY >= 1700 + (2300 * (currentMaxPage-1))) {
        currentMaxPage++;
        updatePokemonHtml();
    }
});

// Stores data from api in pokemonArr as Pokemons
function handleData(data: any) {
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        pokemonArr.push(new Pokemon(
            Number(pokeEntriesData[i].entry_number), 
            pokeEntriesData[i].pokemon_species.name,
            pokeEntriesData[i].pokemon_species.url
            ));
    }
    updatePokemonHtml();
}

// Filters the pokemonArr by a given input and returns the result
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

// Renders the pokemons based on the filter and page number 
function updatePokemonHtml() {
    let filteredArr = filterByName();
    let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
    pokemonList.innerHTML = "";
    for (let i = 0; i < currentMaxPage*20 && i < filteredArr.length; i++) {
        filteredArr[i].getExtraData();
        filteredArr[i].createPokeElement();
    }
}
