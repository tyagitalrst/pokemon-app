import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { pokemonCollections } from "./service/graphql/pokemon/reactiveVariable";

import "./assets/css/index.css";
import App from "./pages/App";

const POKE_API = "https://graphql-pokeapi.vercel.app/api/graphql";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonCollections: {
          read() {
            return pokemonCollections();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: POKE_API,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById("root")
);
