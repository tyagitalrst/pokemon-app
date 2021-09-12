import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Chip, IconButton, Tooltip } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { DELETE_POKEMON_COLLECTION } from "../../service/graphql/pokemon/mutations";

const useStyles = makeStyles((theme) => ({
  pokemonCard: {
    "& a": {
      textDecoration: "none",
    },
    textAlign: "center",
  },
  pokemonName: {
    padding: "10px 20px",
    marginTop: 20,
    backgroundColor: "#CE2211",
    textTransform: "capitalize",
  },
  pokemonRelease: {
    padding: 10,
    textAlign: "right",
  },
  pokemonImage: {
    padding: "20px 0",
    "& img": {
      height: "100%",
      width: 150,
      borderRadius: "50%",
      backgroundColor: "#CE2211",
    },
  },
}));

function PokemonCard({ pokemon, collections }) {
  const classes = useStyles();

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

        <Link to={`/detail/${pokemon.name}`}>
          <div id="pokemon-card__img" className={classes.pokemonImage}>
            <img src={pokemon.image} alt={pokemon.name}></img>
          </div>
          <div>
            <Chip color="secondary" label={`#${pokemon.id}`} />
          </div>
          <div id="pokemon-card__name" className={classes.pokemonName}>
            <Typography
              variant="h6"
              color="secondary"
            >
              {collections ? pokemon.pokemonName : pokemon.name}
            </Typography>
          </div>
        </Link>
      </Paper>
    </div>
  );
}

export default PokemonCard;
