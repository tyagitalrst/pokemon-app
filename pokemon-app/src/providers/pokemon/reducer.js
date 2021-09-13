import POKEMON_TYPE from "./type";

export const POKEMONS_INITIAL_STATE = {
  pokemonList: [],
  pagePokemonList: {
    prev: 0,
    current: 1,
    next: 2,
  },
  varQueryPokemonList: {
    limit: 51,
    offset: 0,
  },
  queryPaginationPokemonList: [],
};

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case POKEMON_TYPE.GET_LIST:
      return {
        ...state,
        pokemonList: action.payload,
      };
    case POKEMON_TYPE.SET_POKEMON_PAGE_LIST:
      let temp = {
        prev: action.payload - 1,
        current: action.payload,
        next: action.payload + 1,
      };
      return {
        ...state,
        pagePokemonList: temp,
      };
    case POKEMON_TYPE.SET_VAR_QUERY_GET_POKEMON_LIST:
      return {
        ...state,
        varQueryPokemonList: action.payload,
      };
    case POKEMON_TYPE.SET_QUERY_PAGINATION_POKEMON_LIST:
      return {
        ...state,
        queryPaginationPokemonList: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
