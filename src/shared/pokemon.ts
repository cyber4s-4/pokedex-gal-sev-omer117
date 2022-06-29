export class Pokemon {
    id;
    name;
    url;
    img;
    height;
    weight;

    constructor(id: number, name: string, url: string, img: string, height: number, weight: number) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.img = img;
        this.height = height;
        this.weight = weight;
        // this.generation = generation;
    }

    getExtraData() {
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/"  + this.name;
        fetch(pokemon_url)
            .then(res => res.json())
            .then(infoData => this.handleInfoData(infoData));
    }

    handleInfoData(infoData: any) {
        this.img = infoData.sprites.front_default;
        this.height = infoData.height;
        this.weight = infoData.weight;
    }

    createPokeElement() {
        let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
        
        pokemonList!.innerHTML += 
        `<div class="pokemon" id="pokemon-${this.id.toString()}">
            <h1>${this.name}</h1>
            <p>${this.id}</p>
            <p>${this.url}</p>
            <div class="pokemonInfo" id="pokemonInfo">
                <p>${this.id}</p>
            </div>
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