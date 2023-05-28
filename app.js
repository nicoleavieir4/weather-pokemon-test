const express = require("express");
const pokemonRoutes = require("./routes/pokemon-routes");

const server = express();
var cors = require("cors");
const port = 3000;

server.use(cors());
server.use(express.json());

server.use(pokemonRoutes);

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
