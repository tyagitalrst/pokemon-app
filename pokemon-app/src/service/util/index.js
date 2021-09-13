export function generateQueryPagination(totalPage, pageSize) {
  let queryPagination = Array(totalPage).fill({
    limit: pageSize,
  });

  return queryPagination.map((query, idx) => {
    return {
      ...query,
      offset: idx * pageSize,
    };
  });
}

export function checkOwnedPokemonName(
  name,
  pokemonName,
  isCollection,
  pokemonCollections
) {
  const ownedPokemon = pokemonCollections.filter(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );

  if (isCollection) {
    return ownedPokemon.filter(
      (pokemon) =>
        pokemon.pokemonName.toLowerCase() === pokemonName.toLowerCase()
    );
  } else {
    return ownedPokemon;
  }
}

export function startEndNumberList(current, pageSize) {
  const start = current * pageSize - (pageSize - 1);
  const end = current * pageSize;
  return { start, end };
}

export function letterCapitalize(str) {
  return str
    .split(" ")
    .map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))
    .join(" ");
}

