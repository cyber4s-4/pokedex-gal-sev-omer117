var app;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/tsc/shared/pokemon.js":
/*!************************************!*\
  !*** ./dist/tsc/shared/pokemon.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pokemon = void 0;
class Pokemon {
    constructor(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
        this.height = 0;
        this.weight = 0;
        this.types = [];
        this.hp = 0;
        this.attack = 0;
        this.defense = 0;
    }
    // Fetches the extra data from the pokemons specific api
    getExtraData() {
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/" + this.name;
        fetch(pokemon_url)
            .then(res => res.json())
            .then(infoData => this.handleInfoData(infoData))
            .then(() => this.renderInfoData(true));
    }
    // Update the extra data to the Pokemon
    handleInfoData(infoData) {
        this.img = infoData.sprites.front_default;
        this.height = infoData.height;
        this.weight = infoData.weight;
        this.hp = infoData.stats[5].base_stat; //hp
        this.attack = infoData.stats[4].base_stat; //attack
        this.defense = infoData.stats[3].base_stat; //defense
        this.types = [];
        for (let i = 0; i < infoData.types.length; i++) {
            this.types.push(infoData.types[i].type.name);
        }
    }
    // Return each type from types array as an html element
    getTypesAsElement() {
        let typesStrings = "";
        for (let i = 0; i < this.types.length; i++) {
            typesStrings += `<div class="types" id="${this.types[i]}"> ${this.types[i]}</div>`;
        }
        return typesStrings;
    }
    // Renders the data from the Pokemon to the HTML
    renderInfoData(hide = false) {
        let pokemonDiv = document.getElementById(`pokemon-${this.id}`);
        let pokemonInfoDiv = document.getElementById(`pokemonInfo-${this.id}`);
        let infoClass = "pokemonInfo";
        if (pokemonInfoDiv.className === "pokemonInfoHidden" && !hide) {
            infoClass = "pokemonInfo";
        }
        else {
            infoClass = "pokemonInfoHidden";
        }
        pokemonDiv.innerHTML =
            `<div class="imgDiv"><img src="${this.img}" alt="pokemon_image"></img></div>
        <div class="idDiv"><p>${this.id}</p></div>
        <div class="nameDiv"><p>${this.name}</p></div>
        <div class="typeDiv">
        ${this.getTypesAsElement()}
        </div>
        <div class="APIDiv"><button><a href=${this.url}>API here!</a></button></div>
        <div class="${infoClass}" id="pokemonInfo-${this.id}">
            <p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
            <p>hp: ${this.hp}</p>
            <p>attack: ${this.attack}</p>
            <p>defense: ${this.defense}</p>
        </div>`;
    }
    // Render the Pokemon
    createPokeElement() {
        let pokemonList = document.getElementById("pokemonList");
        let pokemonDiv = document.createElement("div");
        pokemonDiv.id = 'pokemon-' + this.id;
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
exports.Pokemon = Pokemon;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./dist/tsc/app.js ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const pokemon_1 = __webpack_require__(/*! ./shared/pokemon */ "./dist/tsc/shared/pokemon.js");
fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then(res => res.json())
    .then(data => handleData(data));
let pokemonArr = [];
let input_label = document.getElementById("pokemonSearchLabel");
input_label.addEventListener("click", updatePokemonHtml);
// Pagination event handler
let currentMaxPage = 1;
window.addEventListener("scroll", () => {
    if ((currentMaxPage === 1 && window.scrollY >= currentMaxPage * 1700) || window.scrollY >= 1700 + (2300 * (currentMaxPage - 1))) {
        currentMaxPage++;
        updatePokemonHtml();
    }
});
// Stores data from api in pokemonArr as Pokemons
function handleData(data) {
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        pokemonArr.push(new pokemon_1.Pokemon(Number(pokeEntriesData[i].entry_number), pokeEntriesData[i].pokemon_species.name, pokeEntriesData[i].pokemon_species.url));
    }
    updatePokemonHtml();
}
// Filters the pokemonArr by a given input and returns the result
function filterByName() {
    let input_value = document.getElementById("pokemonSearch").value;
    let filteredArr = [];
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
    let pokemonList = document.getElementById("pokemonList");
    pokemonList.innerHTML = "";
    for (let i = 0; i < currentMaxPage * 20 && i < filteredArr.length; i++) {
        filteredArr[i].getExtraData();
        filteredArr[i].createPokeElement();
    }
}

})();

app = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=app.js.map