const mainContainer = document.getElementById('main-container');

const otherPokemons = document.getElementById('otherPokemons');

const URL_API = "https://pokeapi.co/api/v2/pokemon";

const getPokemons = async(url, searchTerm = "") => {
    const listPokemons = [];
    const response = await axios.get(url);
    const pokemons = searchTerm
    ? response.data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : response.data.results;
//   console.log(pokemons);
  pokemons.forEach(async (pokemom, index) => {
    const dataPokemon = await axios.get(pokemom.url);
    const newPokemon = {
      name: pokemom.name,
      image: dataPokemon.data.sprites.other.dream_world.front_default,
      weight: dataPokemon.data.weight,
      height: dataPokemon.data.height,
      experience: dataPokemon.data.base_experience,
      abilities: dataPokemon.data.abilities,
      number: dataPokemon.data.id,
      type: dataPokemon.data.types[0].type.name,
      icon: dataPokemon.data.sprites.versions["generation-vii"].icons.front_default
    };
    listPokemons.push(newPokemon);
    if (index + 1 === pokemons.length) {
    renderPokemons(listPokemons);
    renderPokemons2(listPokemons);

    }
  });
};

getPokemons(URL_API);

const renderPokemons = (pokemons) => {
    const minPokemons = pokemons.slice(0, 4);
    otherPokemons.innerHTML = '';
    minPokemons.forEach(pokemon => {
        otherPokemons.innerHTML += `
        <figure>
        <img src="${pokemon.image}" alt="pokemon" id="${pokemon.name}">
    </figure>`   
    })
     
}
const renderAbilities = (arrayAbilities) => {
    let abilitiesList = "";
    arrayAbilities.forEach((ability) => {
      abilitiesList += `
          <span class="card__abilities">${ability.ability.name}</span>
          `;
    });
    return abilitiesList;
  };
const others = document.querySelector('#otherPokemons');

const renderPokemons2 = (pokemons) =>{
    others.addEventListener('click', (e) => {
        e.preventDefault();
        pokemons.forEach(element =>{
            if (e.target.id == element.name) {
                mainContainer.innerHTML = '';
                mainContainer.innerHTML =  `
                <section class="charizard-container">
                <div class="title">
                    <figure>
                        <img src="${element.icon}" alt="llama">
                    </figure>
                    <h2>${element.name.toUpperCase()}</h2>
                </div>
                <figure class="image-charizard">
                    <img src="${element.image}" alt="${element.name}">
                </figure>
            </section>
            <article class="info-pokemon">
                <div class="row-info">
                    <div class="row-item">
                        <span class="title-info">No.</span>
                        <span class="info-text">${element.number}</span>
                    </div>
                    <div class="row-item">
                        <span class="title-info">LEVEL</span>
                        <span class="info-text">${element.experience}</span>
                    </div>
                </div>
                <div class="row-info">
                    <div class="row-item">
                        <span class="title-info">TYPE</span>
                        <span class="info-text">${element.type.toUpperCase()}</span>
                    </div>
                    <div class="row-item">
                        <span class="title-info">HABILITY</span>
                        <span class="info-text abilities">${renderAbilities(element.abilities).toUpperCase()}</span>
                    </div>
                </div>
                <div class="row-info">
                    <div class="row-item">
                        <span class="title-info">HEIGHT</span>
                        <span class="info-text">${element.height}</span>
                    </div>
                    <div class="row-item">
                        <span class="title-info">WEIGHT</span>
                        <span class="info-text">${element.weight}</span>
                    </div>
                </div>
            </article>`
            
            }
           
            
        })

        
    })

}




const search = document.querySelector(".form__search");

search.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputSearch = document.querySelector("#inputSearch");
  const searchTerm = inputSearch.value;
  if (searchTerm) {
    getPokemons(URL_API, searchTerm);
  }
  else if(searchTerm == ""){
    getPokemons(URL_API, searchTerm);
  }
});

