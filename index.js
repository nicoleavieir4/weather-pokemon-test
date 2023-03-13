/*
Lugares onde a temperatura for maior que 33ºC, deve-se retornar um pokémon do tipo fogo (fire).
Para qualquer outra temperatura, deve-se retornar um pokémon do tipo normal.
E, no caso em que esteja chovendo na região um pokémon elétrico (electric) deve ser retornado, independente da temperatura.
O pokémon mostrado deve ser aleatório e não deve aparecer duas vezes consecutivas;
*/

function wetherToPokemonType(temperature, isRain) {
    if (isRain) return "eletric";

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

let temperature = 21;
let pokemon = wetherToPokemonType(temperature, true);

console.log(
    `A temperatura é ${temperature} e o pokemon correspondente é ${pokemon}`
);
