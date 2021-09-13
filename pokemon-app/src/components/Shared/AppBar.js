import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as Appbar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBar() {
  const classes = useStyles();

  return (
    <Appbar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Pokédex
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Pokemons
        </Button>
        <Button component={Link} to="/collections" color="inherit">
          My Pokemons
        </Button>
      </Toolbar>
    </Appbar>
  );
}

export default AppBar;
