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
    if (cityResult) {
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
    } else {
      return res.status(404).json({ error: "city not found" });
    }
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

async function favoritePokemon(req, res) {
  const { name, type, favorite } = req.body; //recebe o valor do client, postando uma informacao no corpo da requisicao

  try {
    const newPokemon = await Pokemon.create({
      name: name,
      type: type,
      favorite: favorite,
    });

    // Salva o Pokémon no banco de dados
    const client = await pool.connect();
    await client.query(
      "INSERT INTO pokemon (name, type, favorite) VALUES ($1, $2, $3)",
      [name, type, favorite]
    );
    client.release();

    console.log(
      `O Pokémon ${newPokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`
    );

    return res.status(200).json({
      success: true,
      message: `O Pokémon ${newPokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
      method: req.method,
      headers: req.headers,
      body: req.body,
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

module.exports = { pokemonSearch, pokemonListSearch, favoritePokemon };
