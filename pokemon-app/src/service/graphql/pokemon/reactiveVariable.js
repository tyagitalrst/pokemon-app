import { makeVar } from "@apollo/client";

function setIntialData(key) {
  if (typeof window !== "undefined") {
    const collections = window.sessionStorage.getItem(key);
    if (collections) return JSON.parse(collections);
    else return []
  } else {
    return [];
  }
}

export const pokemonCollections = makeVar(setIntialData('pokemonCollections'));
