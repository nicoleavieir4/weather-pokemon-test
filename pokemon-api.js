const axios = require("axios");

function sortIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getPokemon(type) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`);
  const pokemon = response.data.pokemon;
  const index = sortIndex(0, pokemon.length);

  var pokemonName = pokemon[index].pokemon.name;

  return pokemonName;
}

module.exports = getPokemon;

/* 

1 passo: sortear um numero de 0 a 2 
2 passo: guardar o numero sorteado em uma constante chamada index
3 passo: pegar do array de pokemons o item baseado no index sorteado
4 passo: guardar o item encontrado em uma constante chamada "pokemon" 
5 passo: printar/exibir no console.log a constante pokemon
6 passo: obter o nome do pokemon a partir da const pokemon

Retornar nome do pokemon

*/
