export class Pokemon {
    id;
    name;
    url;
    img;
    height;
    weight;
    types: string[];
    hp;
    attack;
    defense;

    constructor(id: number, name: string, url: string, img: string, height: number, weight: number, hp: number, attack: number, defense: number, types: string[]) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.img = img;
        this.height = height;
        this.weight = weight;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.types = types;
    }

    renderInfoData() {
        let pokemonDiv = document.getElementById(`pokemonInfo-${this.id}`) as HTMLDivElement;
        if(pokemonDiv.className === "pokemonInfoHidden") {
            pokemonDiv.className = "pokemonInfo";
            pokemonDiv.innerHTML = 
            `<p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
            <p>hp: ${this.hp}</p>
            <p>attack: ${this.attack}</p>
            <p>defense: ${this.defense}</p>
            <p>types: ${this.types}</p>`;
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
            this.renderInfoData();
        });
        pokemonDiv.innerHTML = 
        `<div class="imgDiv"><img src="${this.img}" alt="pokemon_image"></img></div>
        <div class="idDiv"><p>${this.id}</p></div>
        <div class="nameDiv"><p>${this.name}</p></div>
        <div class="APIDiv"><button><a href=${this.url}>API here!</a></button></div>
        <div class="pokemonInfoHidden" id="pokemonInfo-${this.id}">
            <p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
            <p>hp: ${this.hp}</p>
            <p>attack: ${this.attack}</p>
            <p>defense: ${this.defense}</p>
            <div>
                <p>types: ${this.types}</p>
            </div>
        </div>`;
        pokemonList.appendChild(pokemonDiv);
    }

}