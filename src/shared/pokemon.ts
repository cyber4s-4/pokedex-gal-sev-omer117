export class Pokemon {
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