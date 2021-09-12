import React from "react";
import { useReactiveVar } from "@apollo/client";
import { pokemonCollections } from "../../service/graphql/pokemon/reactiveVariable";

import PokemonCard from "../../components/pokemon/PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: 20,
  },
}));

function PokemonCollectionList() {
  const classes = useStyles();
  const allCollection = useReactiveVar(pokemonCollections);

  return (
    <div className="pokemon-collection">
      <h1>COLLECTION</h1>

      <Grid container justifyContent="space-between">
        {allCollection &&
          allCollection.map((pokemon) => (
            <Grid
              item
              xs={12}
              md={3}
              className={classes.gridItem}
              key={`${pokemon.id}-${pokemon.name}`}
            >
              <PokemonCard pokemon={pokemon} collections={true}></PokemonCard>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
export default PokemonCollectionList;
