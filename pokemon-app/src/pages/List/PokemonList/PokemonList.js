import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from "../../../service/graphql/pokemon/queries";
import { PokemonContext } from "../../../providers/pokemon/provider";
import {
  generateQueryPagination,
  startEndNumberList,
} from "../../../service/util/index";

import PokemonCard from "../../../components/List/PokemonCard";
import LoadingScreen from "../../../components/Shared/LoadingScreen";
import PokemonHeader from "../../../components/List/PokemonHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  pagination: { margin: "30px 20px 10px" },
}));

function PokemonList() {
  const classes = useStyles();
  const PAGE_SIZE = 51;
  const {
    pagePokemonList,
    varQueryPokemonList,
    queryPaginationPokemonList,
    setPagePokemonList,
    setVarQueryPokemonList,
    setQueryPaginationPokemonList,
  } = useContext(PokemonContext);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const currentStartEndNumberList = startEndNumberList(
    pagePokemonList.current,
    PAGE_SIZE
  );

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
      let countPage = Math.ceil(pokemons.count / PAGE_SIZE);

      if (totalPage !== countPage) {
        let queryPagination = generateQueryPagination(countPage, PAGE_SIZE);
        setTotalPage(countPage);
        setTotalData(pokemons.count);
        setQueryPaginationPokemonList(queryPagination);
      }
    }
  }, [loading, error, pokemons, setQueryPaginationPokemonList, totalPage]);

  return (
    <div className="pokemon-list">
      <PokemonHeader collections={false} />
      <Grid
        container
        justifyContent="space-evenly"
        className={classes.pagination}
      >
        <Grid item xs={12} md={8}>
          <Typography variant="h6" color="secondary">
            {`Show ${currentStartEndNumberList.start}-${
              currentStartEndNumberList.end > totalData
                ? totalData
                : currentStartEndNumberList.end
            } from ${totalData}`}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Pagination
            color="secondary"
            count={totalPage}
            page={pagePokemonList.current}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        {pokemons &&
          pokemons.results &&
          pokemons.results.map((pokemon) => (
            <Grid
              item
              xs={12}
              md={4}
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
