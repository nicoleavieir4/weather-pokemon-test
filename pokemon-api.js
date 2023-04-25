/*

  1 passo: queremos encontrar uma lista de pokemon por tipo (ok)
  2 passo: sortear um pokemon dessa lista (ok)
  3 passo: obter o nome do pokemon sorteado (ok)
  4 passo: obter o ID do pokemon sorteado
  5 passo: obter a imagem do pokemon sorteado
    5.1 passo: a partir do ID do pokemon, buscar detalhes sobre ele (ex: https://pokeapi.co/api/v2/pokemon/25/)
    5.2 passo: encontrar o objeto sprites dentro do retorno da chamada da API do passo acima
    5.3 passo: dentro do objeto sprites, obter a URL da imagem a partir da propriedade "front_default"
  6 passo: retornar na function getPokemon um objeto com as propriedades name e url baseado nas informacoes encontradas nos passos
  anteriores (ate aqui é tudo dentro da function getPokemon)
  7 passo: refatorar todo o fluxo acima da function getPokemon para exibir tanto o nome quanto a url do pokemon sorteado


*/

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

module.exports = getPokemon;
