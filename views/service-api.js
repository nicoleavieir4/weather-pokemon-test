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
  pokemonImageCell.rowSpan = "5";
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

  const favorite = document.createElement("tr");
  const favoriteCell = document.createElement("td");
  favoriteCell.colSpan = "3";

  const favoritePokemonList = document.createElement("button");
  favoritePokemonList.textContent = "Adicionar aos favoritos";
  favoritePokemonList.onclick = () => {
    buttonFavoriteClick(result);
  };

  favoritePokemonList.className = "button favorite-button";

  // listItem.appendChild(favoritePokemonList);
  favoriteCell.appendChild(favoritePokemonList);
  favorite.appendChild(favoriteCell);
  tbody.appendChild(favorite);

  table.appendChild(tbody);
  resultContent.appendChild(table);
}

function buttonFavoriteClick(result) {
  const data = {
    name: result.pokemon.name,
    type: result.type, // Preencha com o tipo adequado do Pokémon, se necessário
    image: result.pokemon.image,
  };

  fetch("http://localhost:3000/my-pokemons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        // Se a requisição for bem-sucedida (status 200), exiba um alerta de sucesso.
        alert(
          `O Pokémon ${result.pokemon.name} foi favoritado com sucesso e salvo no banco de dados!`
        );
      } else if (response.status === 409) {
        // Se a requisição retorna um status 409 (conflito), você pode tratar como um alerta de que o Pokémon já foi favoritado.
        alert(
          `O Pokémon ${result.pokemon.name} já foi favoritado anteriormente.`
        );
      } else {
        // Qualquer outro status é tratado como um erro.
        console.error("Erro ao favoritar o Pokémon");
      }
    })
    .catch(function (error) {
      console.error("Erro ao favoritar o Pokémon", error);
    });
}

function buttonClick() {
  const cityInput = document.getElementById("city");
  const params = { city: cityInput.value };

  if (params.city === "") {
    alert("Cidade inválida! Você deve inserir uma cidade válida.");
    resetSystem();
    return;
  }

  fetch(url + "?" + new URLSearchParams(params))
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na resposta da API");
      }
    })
    .then(function (result) {
      console.log(result);
      renderResult(result);
      cityInput.classList.add("searched");
    })
    .catch(function (error) {
      console.log(error);
      resetSystem();
      alert("Ocorreu um erro ao buscar os dados da cidade.");
      return;
    });
}

function resetSystem() {
  const resultContent = document.getElementById("result-content");
  const cityInput = document.getElementById("city");

  resultContent.innerHTML = "";
  cityInput.value = "";
  cityInput.classList.remove("searched");
}
