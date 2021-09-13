import React from "react";
import { useReactiveVar } from "@apollo/client";
import { DELETE_POKEMON_COLLECTION } from "../../service/graphql/pokemon/mutations";
import { pokemonCollections } from "../../service/graphql/pokemon/reactiveVariable";
import { checkOwnedPokemonName } from "../../service/util";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Grid,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  pokemonCard: {
    "& a": {
      textDecoration: "none",
    },
  },
  pokemonName: {
    padding: "10px 20px",
    marginTop: 10,
    textTransform: "capitalize",
  },
  pokemonRelease: {
    padding: 5,
    textAlign: "right",
  },
  pokemonImage: {
    textAlign: "center",
    padding: "20px 0",
    "& img": {
      height: "100%",
      width: 150,
      borderRadius: "50%",
      backgroundColor: "#CE2211",
    },
  },
  pokemonId: {
    textAlign: "right",
    padding: 10,
  },
}));

function PokemonCard({ pokemon, collections }) {
  const classes = useStyles();
  const allCollection = useReactiveVar(pokemonCollections);
  const OWNED_POKEMON = checkOwnedPokemonName(
    pokemon.name,
    "",
    false,
    allCollection
  ).length;
  const pathDetailParam = collections
    ? `${pokemon.name}/${pokemon.pokemonName}`
    : `${pokemon.name}`;

  const deletePokemon = (pokemonName) => () => {
    return DELETE_POKEMON_COLLECTION(pokemonName);
  };

  return (
    <div id={`pokemon-card-${pokemon.id}`} className={classes.pokemonCard}>
      <Paper elevation={3} className={classes.pokemonPaper}>
        {collections && (
          <div id="pokemon-card__release" className={classes.pokemonRelease}>
            <Tooltip title="Release Pokemon" aria-label="delete">
              <IconButton
                aria-label="delete"
                onClick={deletePokemon(pokemon.pokemonName)}
              >
                <ClearIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <Link
          to={{
            pathname: `/detail/${pathDetailParam}`,
            state: { fromColletions: collections },
          }}
        >
          <Grid container>
            <Grid item xs={5}>
              <div id="pokemon-card__img" className={classes.pokemonImage}>
                <img src={pokemon.image} alt={pokemon.name}></img>
              </div>
            </Grid>
            <Grid item xs={7}>
              {!collections && (
                <div id="pokemon-card__id" className={classes.pokemonId}>
                  <Chip color="secondary" label={`#${pokemon.id}`} />
                </div>
              )}
              <div id="pokemon-card__name" className={classes.pokemonName}>
                <Typography variant="h6" color="secondary">
                  {collections ? pokemon.pokemonName : pokemon.name}
                </Typography>
                {!collections && (
                  <Typography variant="body2" color="secondary">
                    {`Owned Pokemon: ${OWNED_POKEMON}`}
                  </Typography>
                )}
                {collections && (
                  <Typography variant="body2" color="secondary">
                    {`Pokemon: ${pokemon.name}`}
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
        </Link>
      </Paper>
    </div>
  );
}

export default PokemonCard;
