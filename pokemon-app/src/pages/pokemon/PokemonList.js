import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from "../../service/graphql/pokemon/queries";
import { PokemonContext } from "../../providers/pokemon/provider";
import { generateQueryPagination } from "../../service/util/index";

import PokemonCard from "../../components/pokemon/PokemonCard";
import LoadingScreen from "../../components/LoadingScreen";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function PokemonList() {
  const classes = useStyles();
  const pageSize = 52;
  const {
    pagePokemonList,
    varQueryPokemonList,
    queryPaginationPokemonList,
    setPagePokemonList,
    setVarQueryPokemonList,
    setQueryPaginationPokemonList,
  } = useContext(PokemonContext);
  const [totalPage, setTotalPage] = useState(1);

  const handleChangePage = (event, val) => {
    const findQueryVar = queryPaginationPokemonList[val - 1];
    setVarQueryPokemonList(findQueryVar);
    setPagePokemonList(val);
  };

  const {
    loading,
    error,
    data: { pokemons = [] } = {},
  } = useQuery(GET_POKEMON_LIST, {
    variables: varQueryPokemonList,
  });

  useEffect(() => {
    if (loading) return <LoadingScreen loading={loading} />;
    if (error) return <div>Error!</div>;
    if (pokemons) {
      let countPage = Math.ceil(pokemons.count / pageSize);

      if (totalPage !== countPage) {
        let queryPagination = generateQueryPagination(countPage, pageSize);
        setTotalPage(countPage);
        setQueryPaginationPokemonList(queryPagination);
      }
    }
  }, [loading, error, pokemons, setQueryPaginationPokemonList, totalPage]);

  return (
    <div className="pokemon-list">
      <Pagination
        count={totalPage}
        page={pagePokemonList.current}
        onChange={handleChangePage}
      />
      <Grid container justifyContent="space-between">
        {pokemons &&
          pokemons.results &&
          pokemons.results.map((pokemon) => (
            <Grid
              item
              xs={12}
              md={3}
              className={classes.gridItem}
              key={`${pokemon.id}-${pokemon.name}`}
            >
              <PokemonCard pokemon={pokemon} collections={false}></PokemonCard>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default PokemonList;
