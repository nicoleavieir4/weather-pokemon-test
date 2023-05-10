const url = "http://localhost:3000/pokemon-list/search";

function renderResult(result) {
  const resultContent = document.getElementById("result-content");

  if (resultContent.childElementCount > 0) {
    resultContent.innerHTML = "";
  }

  const tableHeader = document.createElement(`table`);
  const tbodyHeader = document.createElement(`tbody`);

  const city = document.createElement("tr");
  city.innerHTML = `<td>Cidade:</td><td>${result.name}</td>`;
  tbodyHeader.appendChild(city);

  const temperature = document.createElement("tr");
  temperature.innerHTML = `<td>Temperatura:</td><td>${result.temperature}</td>`;
  tbodyHeader.appendChild(temperature);

  const climate = document.createElement("tr");
  climate.innerHTML = `<td>Chuva:</td><td>${result.isRaining}</td>`;
  tbodyHeader.appendChild(climate);

  const type = document.createElement("tr");
  type.innerHTML = `<td>Tipo:</td><td>${result.type}</td>`;
  tbodyHeader.appendChild(type);

  tableHeader.appendChild(tbodyHeader);
  resultContent.appendChild(tableHeader);

  for (let i = 0; i < result.pokemons.length; i++) {
    const table = document.createElement(`table-${i}`);
    const tbody = document.createElement(`tbody-${i}`);

    const namePok = document.createElement("tr");
    namePok.innerHTML = `<td>Pokemon:</td><td>${result.pokemons[i].name}</td>`;
    tbody.appendChild(namePok);

    const pokemonImageCell = document.createElement("td");
    pokemonImageCell.rowSpan = "5";
    const pokemonImage = document.createElement("img");
    pokemonImage.src = result.pokemons[i].image;
    pokemonImage.width = "80";
    pokemonImage.height = "80";
    pokemonImageCell.appendChild(pokemonImage);
    namePok.appendChild(pokemonImageCell);

    table.appendChild(tbody);
    resultContent.appendChild(table);
  }
}

function buttonClick() {
  const cityInput = document.getElementById("city");
  const params = { city: cityInput.value };

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
