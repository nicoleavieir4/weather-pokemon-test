const express = require("express");
const server = express();
const port = 3000;
const cities = [
  {
    name: "CAMPINAS",
    temperature: 32,
  },
  {
    name: "SÃO PAULO",
    temperature: 22,
  },
  {
    name: "CURITIBA",
    temperature: 2,
  },
  {
    name: "ALAGOAS",
    temperature: 39,
  },
];

server.get("/pokemon/search", (req, res) => {
  const { city } = req.query; //recebe o valor do client
  const cityResult = cities.find((localCity) => localCity.name == city); // verificando se a cidade recebida existe no array (registrada)
  const response = cityResult
    ? { data: cityResult, status: 200 }
    : { data: { error: "city not found" }, status: 404 };

  return res.status(response.status).json(response.data);
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
