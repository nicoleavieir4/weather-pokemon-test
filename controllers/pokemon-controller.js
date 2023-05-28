const { getPokemon, getPokemonList } = require("../models/pokemon-api"); // MODEL módulo responsável por buscar o Pokémon na API;
const service = require("../service/service");
const weatherMap = require("../models/weather-map"); // MODEL módulo responsável por buscar a previsão do tempo na API
const { Pokemon } = require("../models/pokemon");


async function pokemonSearch(req, res) {
  const { city } = req.query; //recebe o valor do client
  const cityResult = await weatherMap(city);
  if (cityResult) {
    // se cityResult existe, entao ele retorna a cidade encontrada
    const type = service.wetherToPokemonType(
      cityResult.temperature,
      cityResult.isRaining
    );
    const pokemon = await getPokemon(type);

    const body = {
      name: cityResult.name,
      temperature: cityResult.temperature,
      isRaining: cityResult.isRaining,
      // ou "...cityResult," => para desconstruir um objeto
      type,
      pokemon,
    };

    return res.status(200).json(body);
  } else {
    return res.status(404).json({ error: "city not found" });
  }
}

async function pokemonListSearch(req, res) {
  const { city } = req.query; //recebe o valor do client
  const cityResult = await weatherMap(city);
  if (cityResult) {
    // se cityResult existe, entao ele retorna a cidade encontrada
    const type = service.wetherToPokemonType(
      cityResult.temperature,
      cityResult.isRaining
    );
    const pokemons = await getPokemonList(type);

    const body = {
      name: cityResult.name,
      temperature: cityResult.temperature,
      isRaining: cityResult.isRaining,
      // ou "...cityResult," => para desconstruir um objeto
      type,
      pokemons,
    };

    return res.status(200).json(body);
  } else {
    return res.status(404).json({ error: "city not found" });
  }
}

async function favoritePokemon(req, res) {
  console.log(req);
  console.log(req.body);

  const { name, type, favorite } = req.body; //recebe o valor do client, postando uma informacao no corpo da requisicao

  console.log("Teste de favoritos");

  try {
    const newPokemon = await Pokemon.create({
      name: name,
      type: type,
      favorite: favorite,
    });
    console.log(`O Pokemon ${newPokemon.name} foi adicionado aos favoritos!`); // return para sucesso e erro
  } catch (err) {
    console.error("Erro ao favoritar o Pokemon", err);
  }

  return res.status(200).json({
    msg: "Teste ok!",
  });
}

module.exports = { pokemonSearch, pokemonListSearch, favoritePokemon };
