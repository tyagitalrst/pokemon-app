import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../../service/graphql/pokemon/queries";

import LoadingScreen from "../../components/LoadingScreen";
import AddPokemonModal from "../../components/pokemon/AddPokemonModal";

function PokemonDetail() {
  const { name } = useParams();

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
    <div className="pokemon-detail">
      <h1>{`DETAIL-${name}`}</h1>
      <h3>{pokemon.moves ? pokemon.moves[0].move.name : ""}</h3>
      <AddPokemonModal pokemon={pokemon}></AddPokemonModal>
    </div>
  );
}
export default PokemonDetail;
