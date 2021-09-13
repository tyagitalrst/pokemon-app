import React from "react";

import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetailTabMoves from "./DetailTabMoves";
import DetailTabStats from "./DetailTabStatistic";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 0",
    borderRadius: 8,
    flexGrow: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function tabProps(index) {
  return {
    id: `pokemon-detail-full-width-tab-${index}`,
    "aria-controls": `pokemon-detail-full-width-tabpanel-${index}`,
  };
}

function DetailTab({ pokemon }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Fullwidth Tabs Pokemon Detail"
        >
          <Tab className={classes.boldText} label="Moves" {...tabProps(1)} />
          <Tab className={classes.boldText} label="Stats" {...tabProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DetailTabMoves moves={pokemon.moves} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DetailTabStats stats={pokemon.stats} />
        </TabPanel>
      </Paper>
    </div>
  );
}

export default DetailTab;
