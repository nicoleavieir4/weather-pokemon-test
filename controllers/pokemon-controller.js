const { getPokemon, getPokemonList } = require("../models/pokemon-api");
const service = require("../service/service");
const weatherMap = require("../models/weather-map");
const { Pokemon } = require("../models/pokemon");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

async function pokemonSearch(req, res) {
  try {
    const { city } = req.query; //recebe o valor do client
    const cityResult = await weatherMap(city);

    if (!cityResult) {
      return res.status(404).json({ error: "city not found" });
    }

    // se cityResult existe, então ele retorna a cidade encontrada
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
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function pokemonListSearch(req, res) {
  try {
    const { city } = req.query; //recebe o valor do client

    const cityResult = await weatherMap(city);

    if (cityResult) {
      // se cityResult existe, então ele retorna a cidade encontrada
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
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getFavoriteList(req, res) {
  try {
    // Buscamos no banco de dados os registros que possuem a flag favorite = true
    const favoritePokemonList = await Pokemon.findAll({
      where: { favorite: true },
    });
    
    return res.status(200).json({
      success: true,
      message: null,
      method: req.method,
      headers: req.headers,
      list: favoritePokemonList,
    });
  } catch (err) {
    console.error("Erro ao buscar a lista de favoritos", err);

    return res.status(500).json({
      success: false,
      error: "Erro ao buscar a lista de favoritos",
      method: req.method,
      headers: req.headers
    });
  }
}

async function favoritePokemon(req, res) {
  const { name, type } = req.body; //recebe o valor do client, postando uma informacao no corpo da requisicao

  try {
    // Primeiro verificamos se existe um pokemon no banco com o nome fornecido
    let pokemon = await Pokemon.findOne({ where: { name } });

    // Se não existir, iremos criar um novo item no banco, já com a flag favorite = true
    if (!pokemon) {
      pokemon = await Pokemon.create({
        name: name,
        type: type,
        favorite: true,
      });
    } else {
      // Caso contrário iremos atualizar o que ja existe
      await Pokemon.update(
        { favorite: !pokemon.favorite },
        { where: { id: pokemon.id } }
      );
    }

    return res.status(200).json({
      success: true,
      message: `O Pokémon ${pokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
      method: req.method,
      headers: req.headers,
      body: { ...req.body, id: pokemon.id, favorite: pokemon ? !pokemon.favorite : true },
    });
  } catch (err) {
    console.error("Erro ao favoritar o Pokémon", err);

    return res.status(500).json({
      success: false,
      error: "Erro ao favoritar o Pokémon",
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }
}

module.exports = {
  pokemonSearch,
  pokemonListSearch,
  favoritePokemon,
  getFavoriteList,
};
