const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const requestPokemon = () => {
  const pokemonPromisses = [];

  for (let i = 1; i <= 150; i++) {
    pokemonPromisses.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromisses).then((pokemons) => {
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      let pokemonId = JSON.stringify(pokemon.id);
      console.log(pokemonId);
      if (pokemonId.length === 2) {
        pokemonId = 0 + pokemonId;
        console.log(pokemonId);
      }
      if (pokemonId.length === 1) {
        let zeros = "00";
        pokemonId = zeros + pokemonId;
        console.log(pokemonId);
      }

      accumulator += `
      <li class="card">
        <img class="card-image ${types[0]}" alt="${pokemon.name}"src=
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png" />
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>

        <p class="card-subtitle">${types.join(" | ")}</p>
    </li>
      `;

      return accumulator;
    }, "");
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = lisPokemons;
  });
};
requestPokemon();
