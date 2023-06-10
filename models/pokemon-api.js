const axios = require("axios");

function sortIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getPokemon(type) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`); // obtemos a lista de pokemon por tipo
  const pokemonList = response.data.pokemon; // pegamos a lista de pokemons do resultado da chamada acima
  const index = sortIndex(0, pokemonList.length); // sorteamos um pokemon dentro da lista

  const pokemon = pokemonList[index].pokemon; // obtemos o pokemon sorteado da lista

  const imageUrl = pokemon.url; // obtemos a url do pokemon sorteado

  const responseImg = await axios.get(imageUrl);
  const image = responseImg.data.sprites.front_default;

  // codigo aqui, pegar a url e fazer uma chamada para a api (inicio do passo 5)
  return { name: pokemon.name, image: image }; // retornar pokemonName e URL da imagem, pokemon possui as propriedades name e url
}

async function getPokemonList(type) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`); // obtemos a lista de pokemon por tipo
  const pokemonList = response.data.pokemon; // pegamos a lista de pokemons do resultado da chamada acima

  if (!pokemonList.length) {
    return [];
  }

  const iterations = [...Array(10).keys()];

  const pokemons = await Promise.all(iterations.map(async () => {
    const index = sortIndex(0, pokemonList.length); // sorteamos um pokemon dentro da lista
    const pokemon = pokemonList[index].pokemon; // obtemos o pokemon sorteado da lista
    const imageUrl = pokemon.url; // obtemos a url do pokemon sorteado
    const responseImg = await axios.get(imageUrl);

    const image = responseImg.data.sprites.front_default;

    return { name: pokemon.name, image: image }; // adiciona o pokemon na lista
  }))

  // for (let i = 0; i < 10; i++) {
  //   const index = sortIndex(0, pokemonList.length); // sorteamos um pokemon dentro da lista
  //   const pokemon = pokemonList[index].pokemon; // obtemos o pokemon sorteado da lista
  //   const imageUrl = pokemon.url; // obtemos a url do pokemon sorteado
  //   const responseImg = await axios.get(imageUrl);
  //   const image = responseImg.data.sprites.front_default;
  //   pokemons.push({ name: pokemon.name, image: image }); // adiciona o pokemon na lista
  // }
  return pokemons; // retorna a lista de pokemons
}

module.exports = { getPokemon, getPokemonList };
