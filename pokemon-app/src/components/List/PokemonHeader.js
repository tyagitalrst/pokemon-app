import React from "react";
import { useReactiveVar } from "@apollo/client";
import { pokemonCollections } from "../../service/graphql/pokemon/reactiveVariable";

import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pokeball from "../../assets/images/pokeball.png";

const useStyles = makeStyles((theme) => ({
  headerImage: {
    textAlign: "center",
    "& img": {
      width: 250,
    },
  },
  pokemonHeader: {
    margin: 20,
    padding: "20px 10px",
  },
  headerInfo: {
    margin: "auto",
  },
}));

function PokemonHeader({ collections }) {
  const classes = useStyles();
  const allCollection = useReactiveVar(pokemonCollections);
  const headerTitle = collections ? "My Pokémon List" : "Pokémon List";

  return (
    <div>
      <Paper elevation={3} className={classes.pokemonHeader}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div className={classes.headerImage}>
              <img src={Pokeball} alt="pokeball" />
            </div>
          </Grid>
          <Grid item xs={12} md={8} className={classes.headerInfo}>
            <div>
              <Typography variant="h2" color="primary">
                {headerTitle}
              </Typography>
            </div>
            <div>
              <Typography variant="h4" color="secondary">
                {`Total Owned Pokemons: ${allCollection.length} Pokemon`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default PokemonHeader;
