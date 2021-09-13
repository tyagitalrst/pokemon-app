import React from "react";
import { letterCapitalize } from "../../service/util";

import { Grid, Typography, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progressBarGrid: {
    padding: "15px 0",
  },
  progressBar: {
    borderRadius: 8,
  },
  progressBarValue: {
    fontWeight: "bold",
  },
}));

function DetailTabStats({ stats }) {
  const classes = useStyles();

  const setValueStats = (val) => {
    let value = parseFloat(val);
    let max = 100;
    return parseFloat((value / max) * 100).toFixed(0);
  };

  return (
    <div>
      {stats.map((data, index) => (
        <Grid container key={`${data.stat.name}-${index}`}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="secondary">
              {letterCapitalize(data.stat.name)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={1}>
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.progressBarValue}
                >
                  {setValueStats(data.base_stat)}
                </Typography>
              </Grid>
              <Grid item xs={11} className={classes.progressBarGrid}>
                <LinearProgress
                  className={classes.progressBar}
                  variant="determinate"
                  value={
                    setValueStats(data.base_stat) > 100
                      ? 100
                      : setValueStats(data.base_stat)
                  }
                  color={
                    setValueStats(data.base_stat) >= 50
                      ? "secondary"
                      : "primary"
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default DetailTabStats;
