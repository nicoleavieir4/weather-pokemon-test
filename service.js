function wetherToPokemonType(temperature, isRain) {
  if (isRain) return "electric";

  if (temperature < 5) {
    return "ice";
  } else if (temperature >= 5 && temperature < 10) {
    return "water";
  } else if (temperature >= 12 && temperature < 15) {
    return "grass";
  } else if (temperature >= 15 && temperature < 21) {
    return "ground";
  } else if (temperature >= 23 && temperature < 27) {
    return "bug";
  } else if (temperature >= 27 && temperature <= 33) {
    return "rock";
  } else if (temperature > 33) {
    return "fire";
  } else {
    return "normal";
  }
}

module.exports = wetherToPokemonType;
