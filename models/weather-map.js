const axios = require("axios");

async function weatherMap(cityName) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b1b46c346d2e0d34c5866fb75dd4ca3c&units=metric`
    );
    const main = res.data.main;
    const weather = res.data.weather[0];
    const city = {
      name: cityName,
      temperature: main.temp,
      isRaining: weather.main == "Rain",
    };

    return city;
  } catch (error) {
    throw new Error (`Erro ao buscar cidade. ${error.message}`)
  }
}

module.exports = weatherMap;
