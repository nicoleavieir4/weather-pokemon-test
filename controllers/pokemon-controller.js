const { getPokemon, getPokemonList } = require("../models/pokemon-api");
const service = require("../service/service");
const weatherMap = require("../models/weather-map");
const { Pokemon } = require("../models/pokemon");
const { Pool } = require("pg");
const { INTEGER } = require("sequelize");

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
    const favoritePokemonList = await Pokemon.findAndCountAll({
      offset: 0,
      limit: 100,
    });

    return res.status(200).json(favoritePokemonList);
  } catch (err) {
    console.error("Erro ao buscar a lista de favoritos", err);

    return res.status(500).json({
      success: false,
      error: "Erro ao buscar a lista de favoritos",
    });
  }
}

async function favoritePokemon(req, res) {
  const { name, type, image } = req.body; //recebe o valor do client, postando uma informacao no corpo da requisicao
  console.log(req.body);

  try {
    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: { name, type, image },
    });

    return res.status(200).json({
      success: true,
      message: `O Pokémon ${pokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
      data: { ...pokemon, created },
    });

    // // // Primeiro verificamos se existe um pokemon no banco com o nome fornecido
    // // let pokemon = await Pokemon.findOne({ where: { name } });

    // // // Se não existir, iremos criar um novo item no banco, já com a flag favorite = true
    // // if (!pokemon) {
    // //   pokemon = await Pokemon.create({
    // //     name: name,
    // //     type: type,
    // //     favorite: true,
    // //   });
    // // } else {
    // //   // Caso contrário iremos atualizar o que ja existe
    // //   await Pokemon.update(
    // //     { favorite: !pokemon.favorite },
    // //     { where: { id: pokemon.id } }
    // //   );
    // }

    // return res.status(200).json({
    //   success: true,
    //   message: `O Pokémon ${pokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
    //   method: req.method,
    //   headers: req.headers,
    //   body: {
    //     ...req.body,
    //     id: pokemon.id,
    //     favorite: pokemon ? !pokemon.favorite : true,
    //   },
    // });
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

async function deletePokemon(req, res) {
  const { id } = req.params;

  try {
    const result = await Pokemon.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ error: `Pokemon not found` });
    }
    return res
      .status(200)
      .json({ success: true, message: "Pokémon deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao deletar Pokémon" });
  }
}

module.exports = {
  pokemonSearch,
  pokemonListSearch,
  favoritePokemon,
  getFavoriteList,
  deletePokemon,
};
