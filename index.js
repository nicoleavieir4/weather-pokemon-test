function buttonClick() {
  const citySection = document.getElementById("city");

  if (citySection.childElementCount > 0) {
    citySection.innerHTML = "";
  }

  const ul = document.createElement("ul");

  const namePok = document.createElement("pokemon");
  namePok.innerText = "Pokemon Encontrado: Pikachu";
  ul.appendChild(namePok);
  ul.appendChild(document.createElement("br"));

  const city = document.createElement("pokemon");
  city.innerText = "Cidade: São Paulo";
  ul.appendChild(city);
  ul.appendChild(document.createElement("br"));

  const temperature = document.createElement("pokemon");
  temperature.innerText = "Temperatura: 25°C";
  ul.appendChild(temperature);
  ul.appendChild(document.createElement("br"));

  const climate = document.createElement("pokemon");
  climate.innerText = "Clima: Chuvoso";
  ul.appendChild(climate);
  ul.appendChild(document.createElement("br"));

  const type = document.createElement("pokemon");
  type.innerText = "Tipo: Elétrico";
  ul.appendChild(type);
  ul.appendChild(document.createElement("br"));

  citySection.appendChild(ul);

  const imagem = document.createElement("img");
  imagem.src = "./img/pikachu.png";
  imagem.width = "80";
  imagem.height = "80";
  citySection.appendChild(imagem);
}
