export class Pokemon {
    id;
    name;
    url;
    img;
    height;
    weight;

    constructor(id: number, name: string, url: string) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.img = "";
        this.height = 0;
        this.weight = 0;
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
        let pokemonDiv = document.createElement("div") as HTMLDivElement;
        pokemonDiv.id = 'pokemon-'+ this.id;
        pokemonDiv.className = "pokemon";
        pokemonDiv.addEventListener('click', () => {
            this.getExtraData();
            console.log(this);
            //make this update the div with the info after getExtraData
            //maybe return promise from getExtraData and use .then here to update
            //after the fetch finished
        });
        pokemonDiv.innerHTML = 
        `<p>${this.name}</p>
        <p>${this.id}</p>
        <p>${this.url}</p>
        <div class="pokemonInfo" id="pokemonInfo">
            <p>${this.id}</p>
        </div>`;
        pokemonList.appendChild(pokemonDiv);
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