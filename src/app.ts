import { Pokemon } from "./shared/pokemon";

let pokeEntriesFetch = fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => handleData(data));

let pokemonArr: Pokemon[] = [];
let input_label = document.getElementById("pokemonSearchLabel") as HTMLLabelElement;
input_label.addEventListener("click", updatePokemonHtml);

let currentMaxPage = 1;
window.addEventListener("scroll", () => {
    if((currentMaxPage === 1 && window.scrollY >= currentMaxPage * 280) || window.scrollY >= 200 + (950 * (currentMaxPage-1))) {
        currentMaxPage++;
        updatePokemonHtml();
    }
    console.log(currentMaxPage);
    
});


function handleData(data: any) {
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {

        pokemonArr.push(new Pokemon(
            Number(pokeEntriesData[i].entry_number), 
            pokeEntriesData[i].pokemon_species.name,
            pokeEntriesData[i].pokemon_species.url
            ));
        // pokemonArr[i].createPokeElement();
    }
    updatePokemonHtml();
    
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

console.log(pokemonArr);


