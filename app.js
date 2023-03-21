const express = require("express");
const getPokemon = require("./pokemon-api");
const service = require("./service");
const weatherMap = require("./weather-map");

const server = express();
const port = 3000;

server.get("/pokemon/search", async (req, res) => {
  const { city } = req.query; //recebe o valor do client
  const cityResult = await weatherMap(city); 
  if (cityResult) {
    // se cityResult existe, entao ele retorna a cidade encontrada
    const type = service(cityResult.temperature, cityResult.isRaining);
    const pokemon = await getPokemon(type)

    const body = {
      name: cityResult.name,
      temperature: cityResult.temperature,
      isRaining: cityResult.isRaining,
      // ou "...cityResult," => para desconstruir um objeto
      type,
      pokemon,
    };

    return res.status(200).json(body);
    // OU => return res.status(200).json({...cityResult, type});

  } else {
    // const erro = { error: "city not found" };

    return res.status(404).json({error: "city not found"})
  }

  // const statusRet = res.response
  // ? { data: response, status: 200 }
  // : { data: { error: "city not found" }, status: 404 };

  //return res.status(statusRet.status).json(statusRet.data);

  // return res.json(cityResult);
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
