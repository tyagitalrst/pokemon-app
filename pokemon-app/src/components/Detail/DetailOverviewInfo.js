import React from "react";
import { useReactiveVar } from "@apollo/client";
import { pokemonCollections } from "../../service/graphql/pokemon/reactiveVariable";
import { letterCapitalize, checkOwnedPokemonName } from "../../service/util";
import TYPE_COLOR from "../../service/constant/type";

import { Paper, Typography, Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddPokemonModal from "./Modal/AddPokemonModal";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
  },
  pokemonId: {
    textAlign: "right",
    padding: 20,
  },
  pokemonImage: {
    textAlign: "center",
    "& img": {
      width: "225px",
    },
  },
  pokemonName: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  catchButton: {
    textAlign: "center",
    padding: "10px 0",
  },
  overviewInfo: {
    margin: "10px 20px",
    padding: "30px 30px 20px",
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#F5F5F5",
  },
  boldText: {
    fontWeight: "bold",
  },
  chipType: {
    margin: "2px 2px 0",
    color: "white",
    fontWeight: "bold",
  },
}));

function DetailOverviewInfo({ pokemon, pokemonName, collections }) {
  const classes = useStyles();
  const allCollection = useReactiveVar(pokemonCollections);
  const OWNED_POKEMON = checkOwnedPokemonName(
    pokemon.name,
    "",
    false,
    allCollection
  ).length;

  let dataOverview = [
    {
      title: "Total Owned",
      value: OWNED_POKEMON,
    },
    {
      title: "Height",
      value: `${parseFloat(pokemon.height / 10)} m`,
    },
    {
      title: "Weight",
      value: `${parseFloat(pokemon.weight / 10)} kg`,
    },
    {
      title: "Abilities",
      value: pokemon.abilities
        .map((ability) => letterCapitalize(ability.ability.name))
        .join(", "),
    },
  ];

  if (collections) {
    let dataCollections = [
      {
        title: "Given Name",
        value: letterCapitalize(pokemonName),
      },
    ];
    dataOverview = [...dataCollections, ...dataOverview];
  }

  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <div className={classes.pokemonId}>
          <Chip color="secondary" label={`#${pokemon.id}`} />
        </div>
        <div className={classes.pokemonImage}>
          <img src={pokemon.sprites.front_default} alt={pokemon.sprites}></img>
        </div>
        <div className={classes.pokemonName}>
          <Typography variant="h4" color="secondary">
            {pokemon.name}
          </Typography>
        </div>
        <div className={classes.catchButton}>
          <AddPokemonModal pokemon={pokemon} />
        </div>
        <Paper className={classes.overviewInfo}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" color="secondary">
                Type
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              {pokemon.types.map((pokemonType, idx) => (
                <Chip
                  key={`${idx}-${pokemonType.type.name}`}
                  style={{ backgroundColor: TYPE_COLOR[pokemonType.type.name] }}
                  className={classes.chipType}
                  label={letterCapitalize(pokemonType.type.name)}
                />
              ))}
            </Grid>
          </Grid>
          {dataOverview &&
            dataOverview.map((data, index) => (
              <Grid
                container
                key={`idx-${index}-${data.value}`}
                data-testid={`idx-${index}-${data.value}`}
              >
                <Grid item xs={12} md={4}>
                  <Typography variant="body1" color="secondary">
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="body1"
                    color="secondary"
                    className={classes.boldText}
                  >
                    {data.value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </Paper>
      </Paper>
    </div>
  );
}

export default DetailOverviewInfo;
