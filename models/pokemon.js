"use strict";
const { Sequelize } = require("sequelize");
const database = require("../db");

const Pokemon = database.define("pokemons", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
  },
  favorite: Sequelize.BOOLEAN,
});

module.exports = { Pokemon };

// module.exports = (sequelize, DataTypes) => {
//   class Pokemon extends Model {
//     static associate(models) {
//     }
//   }
//   Pokemon.init({
//     name: DataTypes.STRING,
//     type: DataTypes.STRING,
//     favorite: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Pokemon',
//   });
//   return Pokemon;
// };
