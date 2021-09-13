import React, { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { pokemonCollections } from "../../service/graphql/pokemon/reactiveVariable";
import { startEndNumberList } from "../../service/util";
import usePagination from "../../providers/pokemon/pagination";

import PokemonCard from "../../components/pokemon/PokemonCard";
import PokemonHeader from "../../components/pokemon/PokemonHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: 20,
  },
  pagination: { margin: "30px 20px 10px" },
}));

function PokemonCollectionList() {
  const classes = useStyles();
  const PAGE_SIZE = 51;
  const allCollection = useReactiveVar(pokemonCollections);
  const [page, setPage] = useState(1);
  const currentStartEndNumberList = startEndNumberList(page, PAGE_SIZE);

  const totalPage = Math.ceil(allCollection.length / PAGE_SIZE);
  const dataCollection = usePagination(allCollection, PAGE_SIZE, totalPage);

  const handleChangePage = (event, val) => {
    setPage(val);
    dataCollection.jump(val);
  };

  return (
    <div className="pokemon-collection">
      <PokemonHeader collections={true} />
      {allCollection.length > 0 && (
        <Grid
          container
          justifyContent="space-evenly"
          className={classes.pagination}
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="secondary">
              {`Show ${currentStartEndNumberList.start}-${
                currentStartEndNumberList.end > allCollection.length
                  ? allCollection.length
                  : currentStartEndNumberList.end
              } from ${allCollection.length}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Pagination
              color="secondary"
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      )}

      <Grid container>
        {dataCollection.currentData().map((pokemon) => (
          <Grid
            item
            xs={12}
            md={4}
            className={classes.gridItem}
            key={`${pokemon.id}-${pokemon.name}-${pokemon.pokemonName}`}
          >
            <PokemonCard pokemon={pokemon} collections={true}></PokemonCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default PokemonCollectionList;
