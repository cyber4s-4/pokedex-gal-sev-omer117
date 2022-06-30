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
        this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
        this.height = 0;
        this.weight = 0;
        // this.generation = generation;
    }

    getExtraData() {
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/"  + this.name;
        fetch(pokemon_url)
            .then(res => res.json())
            .then(infoData => this.handleInfoData(infoData))
            .then(() => this.renderInfoData());
    }

    handleInfoData(infoData: any) {
        this.img = infoData.sprites.front_default;
        this.height = infoData.height;
        this.weight = infoData.weight;
    }

    renderInfoData() {
        let pokemonDiv = document.getElementById(`pokemonInfo-${this.id}`) as HTMLDivElement;
        if(pokemonDiv.className === "pokemonInfoHidden") {
            pokemonDiv.className = "pokemonInfo";
            pokemonDiv.innerHTML = 
            `<p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>`;
        } else {
            pokemonDiv.className = "pokemonInfoHidden";
        }
    }

    createPokeElement() {
        let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
        let pokemonDiv = document.createElement("div") as HTMLDivElement;
        pokemonDiv.id = 'pokemon-'+ this.id;
        pokemonDiv.className = "pokemon";
        pokemonDiv.addEventListener('click', () => {
            this.getExtraData();
        });
        pokemonDiv.innerHTML = 
        `<div class="imgDiv"><img src="${this.img}" alt="pokemon_image"></img></div>
        <div class="idDiv"><p>${this.id}</p></div>
        <div class="nameDiv"><p>${this.name}</p></div>
        <div class="APIHref"><a href=${this.url}>API here!</a></div>
        <div class="pokemonInfoHidden" id="pokemonInfo-${this.id}">
            <p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
        </div>`;
        pokemonList.appendChild(pokemonDiv);
    }

}