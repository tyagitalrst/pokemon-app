import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PokemonProvider from "../providers/pokemon/provider";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Theme from "../assets/theme";
import AppBar from "../components/AppBar";
import PokemonList from "./pokemon/PokemonList";
import PokemonDetail from "./pokemon/PokemonDetail";
import PokemonCollectionList from "./pokemon/PokemonCollectionList";

const App = () => {
  return (
    <Router>
      <PokemonProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <AppBar></AppBar>
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/detail/:name/:offset/:limit" component={PokemonDetail} />
            <Route path="/collections" component={PokemonCollectionList} />
          </Switch>
        </ThemeProvider>
      </PokemonProvider>
    </Router>
  );
};

export default App;