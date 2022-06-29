
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
        pokemonArr[i].createPokeElement();
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

    createPokeElement() {
        let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
        
        pokemonList!.innerHTML += 
        `<div class="pokemon" id="pokemon-${this.id.toString()}">
            <h1>${this.name}</h1>
            <p>${this.id}</p>
            <p>${this.url}</p>
        </div>`;
    }
        
    // <img class="laptop-img" src="${product.photo}">
    // <div class="mid-div">
    //   <div class="laptop-name">${product.name}</div>
    //   <div class="laptop-info"></div>
    // </div>
    // <div class="left-div">
    //   <img class="laptop-logo" src="${product.logoPhoto}">
    //   <div class="laptop-price">₪${product.price}</div>
    // </div>
}

