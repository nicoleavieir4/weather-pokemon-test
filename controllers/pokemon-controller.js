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
  const { name, type, image } = req.body;

  try {
    const existingPokemon = await Pokemon.findOne({ where: { name } });

    if (existingPokemon) {
      // O Pokémon já existe no banco de dados.
      return res.status(409).json({
        success: false,
        error: `O Pokémon ${existingPokemon.name} já foi favoritado anteriormente.`,
      });
    } else {
      // O Pokémon não existe no banco de dados. Crie um novo.
      const newPokemon = await Pokemon.create({ name, type, image });

      return res.status(201).json({
        success: true,
        message: `O Pokémon ${newPokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
        data: newPokemon,
      });
    }
  } catch (err) {
    console.error("Erro ao favoritar o Pokémon", err);
    return res.status(500).json({
      success: false,
      error: "Erro ao favoritar o Pokémon",
    });
  }
}

// async function favoritePokemon(req, res) {
//   const { name, type, image } = req.body; //recebe o valor do client, postando uma informacao no corpo da requisicao
//   console.log(req.body);

//   try {
//     // Verifique se o Pokémon já existe no banco de dados com base no nome.
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (existingPokemon) {
//       // O Pokémon já existe no banco de dados. Você pode optar por atualizá-lo aqui.
//       // existingPokemon.type = type;
//       // existingPokemon.image = image;
//       // await existingPokemon.save();

//       return res.status(200).json({
//         success: true,
//         message: `O Pokémon ${existingPokemon.name} já existe em seu banco de dados!`,
//         data: existingPokemon,
//       });
//     } else {
//       // O Pokémon não existe no banco de dados. Crie um novo.
//       const newPokemon = await Pokemon.create({ name, type, image });

//       return res.status(201).json({
//         success: true,
//         message: `O Pokémon ${newPokemon.name} foi adicionado aos favoritos e salvo no banco de dados!`,
//         data: newPokemon,
//       });
//     }
//   } catch (err) {
//     console.error("Erro ao favoritar o Pokémon", err);
//     return res.status(500).json({
//       success: false,
//       error: "Erro ao favoritar o Pokémon",
//     });
//   }
// }

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
