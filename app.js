const express = require("express");
const service = require("./service");

const server = express();
const port = 3000;
const cities = [
  {
    name: "CAMPINAS",
    temperature: 32,
    isRaining: true,
  },
  {
    name: "SÃO PAULO",
    temperature: 22,
    isRaining: true,
  },
  {
    name: "CURITIBA",
    temperature: 2,
    isRaining: false,
  },
  {
    name: "ALAGOAS",
    temperature: 39,
    isRaining: false,
  },
];

server.get("/pokemon/search", (req, res) => {
  const { city } = req.query; //recebe o valor do client
  const cityResult = cities.find((localCity) => localCity.name == city); // verificando se a cidade recebida existe no array (registrada)
  if (cityResult) {
    const type = service(cityResult.temperature, cityResult.isRaining);

    const response = {
      name: cityResult.name,
      temperature: cityResult.temperature,
      isRaining: cityResult.isRaining,
      type: type,
    };

    return res.json(response);
  }

  const statusRet = res.response
  ? { data: response, status: 200 }
  : { data: { error: "city not found" }, status: 404 };

  return res.status(statusRet.status).json(statusRet.data);

  // return res.json(cityResult);
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
