function renderResult(pokemonList) {
  const resultContent = document.getElementById("result-content");

  if (resultContent.childElementCount > 0) {
    resultContent.innerHTML = "";
  }

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  pokemonList.forEach((pokemon) => {
    const namePok = document.createElement("tr");
    namePok.innerHTML = `<td>Pokemon:</td><td>${pokemon.name}</td>`;
    tbody.appendChild(namePok);

    const pokemonImageCell = document.createElement("td");
    pokemonImageCell.rowSpan = "2";
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.width = "80";
    pokemonImage.height = "80";
    pokemonImageCell.appendChild(pokemonImage);
    namePok.appendChild(pokemonImageCell);

    const type = document.createElement("tr");
    type.innerHTML = `<td>Tipo:</td><td>${pokemon.type}</td>`;
    tbody.appendChild(type);
    const favorite = document.createElement("tr");
    const favoriteCell = document.createElement("td");
    favoriteCell.colSpan = "3";

    const deletePokemonList = document.createElement("button");
    deletePokemonList.textContent = "Remover dos favoritos";
    deletePokemonList.onclick = () => {
      buttonRemoveClick(pokemon);
    };

    deletePokemonList.className = "button remove-button";

    favoriteCell.appendChild(deletePokemonList);
    favorite.appendChild(favoriteCell);
    tbody.appendChild(favorite);
  });

  table.appendChild(tbody);
  resultContent.appendChild(table);
}

function buttonRemoveClick(pokemon) {
  const id = pokemon.id
  fetch(`http://localhost:3000/my-pokemons/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na resposta da API");
      }
    })
    .then(function (result) {
      console.log(result);
      alert(`O pokemon ${pokemon.name} foi removido da lista.`)
      start()
    })
    .catch(function (error) {
      console.error("Não foi possível carregar a lista de pokemons.", error);
      alert(`Não foi possível carregar a lista de pokemons.`);
    });
}

function start() {
  fetch("http://localhost:3000/my-pokemons", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na resposta da API");
      }
    })
    .then(function (result) {
      console.log(result);
      renderResult(result.rows);
    })
    .catch(function (error) {
      console.error("Não foi possível carregar a lista de pokemons.", error);
      alert(`Não foi possível carregar a lista de pokemons.`);
    });
}

start();
