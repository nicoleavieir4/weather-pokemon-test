const url = "http://localhost:3000/pokemon/search";

function renderResult(result) {
  const resultContent = document.getElementById("result-content");

  if (resultContent.childElementCount > 0) {
    resultContent.innerHTML = "";
  }

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  const namePok = document.createElement("tr");
  namePok.innerHTML = `<td>Pokemon:</td><td>${result.pokemon.name}</td>`;
  tbody.appendChild(namePok);

  const pokemonImageCell = document.createElement("td");
  pokemonImageCell.rowSpan ="5"
  const pokemonImage = document.createElement("img");
  pokemonImage.src = result.pokemon.image;
  pokemonImage.width = "80";
  pokemonImage.height = "80";
  pokemonImageCell.appendChild(pokemonImage);
  namePok.appendChild(pokemonImageCell);


  const city = document.createElement("tr");
  city.innerHTML = `<td>Cidade:</td><td>${result.name}</td>`;
  tbody.appendChild(city);

  const temperature = document.createElement("tr");
  temperature.innerHTML = `<td>Temperatura:</td><td>${result.temperature}</td>`;
  tbody.appendChild(temperature);

  const climate = document.createElement("tr");
  climate.innerHTML = `<td>Chuva:</td><td>${result.isRaining}</td>`;
  tbody.appendChild(climate);

  const type = document.createElement("tr");
  type.innerHTML = `<td>Tipo:</td><td>${result.type}</td>`;
  tbody.appendChild(type);

  table.appendChild(tbody);
  resultContent.appendChild(table);
}

function buttonClick() {
  const cityInput = document.getElementById("city");
  const pokemonInput = document.getElementById("result-content");

  const params = { city: cityInput.value, pokemon: pokemonInput.innerText };

  fetch(url + "?" + new URLSearchParams(params))
    .then(function (data) {
      return data.json();
    })
    .then(function (result) {
      console.log(result);
      renderResult(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}
