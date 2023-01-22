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
      type: dataPokemon.data.types[0].type.name
      
    };
    listPokemons.push(newPokemon);
    if (index + 1 === pokemons.length) {
      console.log(listPokemons);
    //   renderPokemons(listPokemons);
    // renderPokemon(listPokemons);
    renderPokemons(listPokemons);

    }
  });
};

getPokemons(URL_API);

const renderPokemons = (pokemons, index) => {
    const minPokemons = pokemons.slice(0, 4);
    otherPokemons.innerHTML = '';
    minPokemons.forEach(pokemon => {
        otherPokemons.innerHTML += `
        <figure>
        <img src="${pokemon.image}" alt="pokemon" id="${pokemon.name}">
    </figure>`   
    })

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
    others.addEventListener('click', (e) => {
        e.preventDefault();
        mainContainer.innerHTML = '';
        console.log(e.target.id);
        pokemons.forEach(element =>{
            if (e.target.id == element.name) {
                mainContainer.innerHTML =  `
                <section class="charizard-container">
                <div class="title">
                    <figure>
                        <img src="https://static.vecteezy.com/system/resources/previews/001/188/706/original/flame-png.png" alt="llama">
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
                        <span class="info-text">${element.type}</span>
                    </div>
                    <div class="row-item">
                        <span class="title-info">HABILITY</span>
                        <span class="info-text">${renderAbilities(element.abilities)}</span>
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




// const search = document.querySelector(".form__search");

// search.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const inputSearch = document.querySelector("#inputSearch");
//   //Los valores que JavaScript reconoce como false son: undefined, null, 0, '' (strig vacío), NaN.
//   const searchTerm = inputSearch.value;
//   if (searchTerm) {
//     console.log(searchTerm);
//     console.log(typeof searchTerm);

