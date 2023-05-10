async function updatePokemonFavoriteStatus(id, isFavorite) {
  const response = await fetch("/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      is_favorite: isFavorite,
    }),
  });
  return await response.json();
}
