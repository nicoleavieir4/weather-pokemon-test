const express = require("express");
const pokemonController = require("../controllers/pokemon-controller")

const router = express.Router();

router.get("/pokemon/search", pokemonController.pokemonSearch);
router.get("/pokemon-list/search", pokemonController.pokemonListSearch);
router.get("/pokemon-favorite/list", pokemonController.getFavoriteList);
router.post("/pokemon-favorite", pokemonController.favoritePokemon);



module.exports = router;

