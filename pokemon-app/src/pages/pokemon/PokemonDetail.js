import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../../service/graphql/pokemon/queries";

import LoadingScreen from "../../components/LoadingScreen";
import DetailBreadcrumb from "../../components/pokemon/DetailBreadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import DetailInfo from "../../components/pokemon/DetailInfo";

const useStyles = makeStyles((theme) => ({
  pokemonDetail: {
    margin: 20,
  },
}));

function PokemonDetail() {
  const classes = useStyles();
  const { name, pokemonName } = useParams();
  const history = useHistory();
  const isCollectionDetail = history.location.state.fromColletions;

  const {
    loading,
    error,
    data: { pokemon = {} } = {},
  } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name: name,
    },
  });

  if (loading) return <LoadingScreen loading={loading} />;
  if (error) return <div>Error!</div>;

  return (
    <div className={classes.pokemonDetail}>
      <DetailBreadcrumb
        pokemon={pokemon}
        pokemonName={pokemonName}
        collectionDetail={isCollectionDetail}
      />
      <DetailInfo pokemon={pokemon} pokemonName={pokemonName} collections={isCollectionDetail} />
    </div>
  );
}
export default PokemonDetail;
