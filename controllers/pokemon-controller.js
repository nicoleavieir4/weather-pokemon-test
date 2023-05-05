const getPokemon = require("../models/pokemon-api"); // MODEL módulo responsável por buscar o Pokémon na API;
const service = require("../service/service");
const weatherMap = require("../models/weather-map"); // MODEL módulo responsável por buscar a previsão do tempo na API

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

module.exports = { pokemonSearch };
