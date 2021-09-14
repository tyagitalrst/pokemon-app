import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PokemonProvider from "../providers/pokemon/provider";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Theme from "../assets/theme";
import AppBar from "../components/Shared/AppBar";
import PokemonList from "./List/PokemonList/PokemonList";
import PokemonDetail from "./Detail/PokemonDetail";
import PokemonCollectionList from "./List/PokemonCollectionList/PokemonCollectionList";


const App = () => {
  return (
    <Router>
      <PokemonProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <AppBar></AppBar>
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/detail/:name/:pokemonName?" component={PokemonDetail} />
            <Route path="/collections" component={PokemonCollectionList} />
          </Switch>
        </ThemeProvider>
      </PokemonProvider>
    </Router>
  );
};

export default App;
