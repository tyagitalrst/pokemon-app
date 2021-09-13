import React from "react";

import { Typography, Grid } from "@material-ui/core";
import DetailOverviewInfo from "./DetailOverviewInfo";
import DetailTab from "./Tab/DetailTab";

function DetailInfo({ pokemon, pokemonName, collections }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <DetailOverviewInfo
            pokemon={pokemon}
            pokemonName={pokemonName}
            collections={collections}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <div>
            <Typography variant="h3" color="primary">
              Pokémon Information
            </Typography>
          </div>
          <DetailTab pokemon={pokemon} />
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailInfo;
