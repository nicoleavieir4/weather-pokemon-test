const express = require("express");
const pokemonController = require("../controllers/pokemon-controller");

const router = express.Router();

router.get("/pokemon/search", pokemonController.pokemonSearch);
// router.get("/pokemon-list/search", pokemonController.pokemonListSearch);
router.get("/my-pokemons", pokemonController.getFavoriteList);
router.post("/my-pokemons", pokemonController.favoritePokemon);
router.delete("/my-pokemons/:id", pokemonController.deletePokemon);

http: module.exports = router;
