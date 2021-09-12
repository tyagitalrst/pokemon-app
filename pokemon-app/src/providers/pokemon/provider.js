import React, { createContext, useReducer } from "react";
import pokemonReducer, { POKEMONS_INITIAL_STATE } from "./reducer";
import POKEMON_TYPE from "./type";

export const PokemonContext = createContext({
  ...POKEMONS_INITIAL_STATE,
});

const PokemonProvider = ({ children }) => {
  const [store, dispatch] = useReducer(pokemonReducer, POKEMONS_INITIAL_STATE);
  const { pokemonList, pagePokemonList, varQueryPokemonList, queryPaginationPokemonList} = store;

  const getPokemonList = (pokemons) => {
    dispatch({
      type: POKEMON_TYPE.GET_LIST,
      payload: pokemons,
    });
  };

  const setPagePokemonList = (page) => {
    dispatch({
      type: POKEMON_TYPE.SET_POKEMON_PAGE_LIST,
      payload: page,
    });
  };

  const setVarQueryPokemonList = (query) => {
    dispatch({
      type: POKEMON_TYPE.SET_VAR_QUERY_GET_POKEMON_LIST,
      payload: query,
    });
  };

  const setQueryPaginationPokemonList = (listQuery) => {
    dispatch({
      type: POKEMON_TYPE.SET_QUERY_PAGINATION_POKEMON_LIST,
      payload: listQuery,
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pagePokemonList,
        varQueryPokemonList,
        queryPaginationPokemonList,
        getPokemonList,
        setPagePokemonList,
        setVarQueryPokemonList,
        setQueryPaginationPokemonList
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
