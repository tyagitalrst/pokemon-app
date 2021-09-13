import React from "react";
import { letterCapitalize } from "../../service/util";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& a": {
      textDecoration: "none",
    },
  },
  breadrumb: {
    display: "inline-block",
    verticalAlign: "middle",
  },
}));

function DetailBreadcrumb({ pokemon, pokemonName, collectionDetail }) {
  const classes = useStyles();
  const hrefBack = collectionDetail ? "/collections" : "/";

  return (
    <div className={classes.root}>
      <Link to={hrefBack}>
        <IconButton aria-label="back">
          <ArrowBackIcon color="primary" />
        </IconButton>
      </Link>

      <Breadcrumbs
        aria-label="pokemon-detail-breadcrumb"
        className={classes.breadrumb}
      >
        <Link to={hrefBack}>
          <Typography variant="h5" color="primary">
            {collectionDetail ? "My Pokémons" : "Pokémons"}
          </Typography>
        </Link>
        <Typography variant="h5" color="secondary">
          {collectionDetail
            ? letterCapitalize(pokemonName)
            : letterCapitalize(pokemon.name)}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default DetailBreadcrumb;
