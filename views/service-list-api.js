const url = "http://localhost:3000/pokemon-list/search";
const favorites = {};

function renderResult(result) {
  const resultContent = document.getElementById("result-content");

  if (resultContent.childElementCount > 0) {
    resultContent.innerHTML = "";
  }

  const cityName = document.createElement("h3");
  cityName.textContent = `Cidade: ${result.name}`;
  resultContent.appendChild(cityName);

  const temperature = document.createElement("p");
  temperature.textContent = `Temperatura: ${result.temperature}`;
  resultContent.appendChild(temperature);

  const climate = document.createElement("p");
  climate.textContent = `Chuva: ${result.isRaining}`;
  resultContent.appendChild(climate);

  const type = document.createElement("p");
  type.textContent = `Tipo: ${result.type}`;
  resultContent.appendChild(type);

  const pokemonList = document.createElement("ul");
  pokemonList.style.listStyle = "none";
  pokemonList.style.padding = "0";
  pokemonList.style.marginTop = "10px";

  for (let i = 0; i < result.pokemons.length; i++) {
    const pokemon = result.pokemons[i];

    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.marginBottom = "10px";

    const pokemonName = document.createElement("span");
    pokemonName.textContent = pokemon.name;
    listItem.appendChild(pokemonName);

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.width = "80";
    pokemonImage.height = "80";
    pokemonImage.style.marginLeft = "10px";
    listItem.appendChild(pokemonImage);

    const favoriteStar = document.createElement("span");
    favoriteStar.classList.add("favorite-star");
    favoriteStar.textContent = "⭐";
    favoriteStar.style.marginLeft = "10px";
    listItem.appendChild(favoriteStar);

    // Verifica se o pokemon está favoritado e atualiza a classe CSS da estrela
    if (favorites[pokemon.name]) {
      favoriteStar.classList.add("selected");
    }

    // Adiciona evento de clique para favoritar/desfavoritar o pokemon
    favoriteStar.addEventListener("click", function () {
      clickStar(pokemon.name, favoriteStar);
    });

    pokemonList.appendChild(listItem);
  }

  resultContent.appendChild(pokemonList);
}

function clickStar(pokemonName, favoriteStar) {
  if (favorites[pokemonName]) {
    // Remove dos favoritos
    delete favorites[pokemonName];
    favoriteStar.classList.remove("selected");
  } else {
    // Adiciona aos favoritos
    favorites[pokemonName] = true;
    favoriteStar.classList.add("selected");
    // Envia a requisição para favoritar o Pokémon
    const data = {
      name: pokemonName,
      type: "", // Preencha com o tipo adequado do Pokémon, se necessário
      favorite: true,
    };

    fetch("http://localhost:3000/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          console.log(`O Pokémon ${pokemonName} foi favoritado com sucesso!`);
        } else {
          console.error("Erro ao favoritar o Pokémon");
        }
      })
      .catch(function (error) {
        console.error("Erro ao favoritar o Pokémon", error);
      });
  }
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
