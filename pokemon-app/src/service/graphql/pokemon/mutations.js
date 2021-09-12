import { pokemonCollections } from "./reactiveVariable";

export function ADD_POKEMON_COLLECTION(pokemonName, data) {
  const collection = [...pokemonCollections()];
  let newCollection = [
    {
      id: data.id,
      name: data.name,
      image: "boo",
      pokemonName: pokemonName,
    },
  ];
  const allCollection = [...collection, ...newCollection];
  pokemonCollections(allCollection);
  window.sessionStorage.setItem(
    "pokemonCollections",
    JSON.stringify(allCollection)
  );
}

export function DELETE_POKEMON_COLLECTION(pokemonName) {
  const collection = [...pokemonCollections()];
  const currentCollection = collection.filter(
    (pokemon) => pokemon.pokemonName !== pokemonName
  );
  pokemonCollections(currentCollection);
  window.sessionStorage.setItem(
    "pokemonCollections",
    JSON.stringify(currentCollection)
  );
}

export function DELETE_ALL_POKEMON_COLLECTION(pokemonName) {
  pokemonCollections([]);
  window.sessionStorage.setItem("pokemonCollections", JSON.stringify([]));
}
