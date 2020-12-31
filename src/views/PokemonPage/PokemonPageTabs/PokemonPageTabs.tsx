/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon } from "../../../types/Pokemon";
import { PokemonPageTabsGeneral } from "./PokemonPageTabsGeneral";
import { PokemonPageTabsStats } from "./PokemonPageTabsStats";

export type PokemonPageTabsProps = {
  pokemon: Pokemon;
};

export const PokemonPageTabs: React.FC<PokemonPageTabsProps> = ({
  pokemon,
}: PokemonPageTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12} sm={6} className={classes.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="General" className={classes.tabLabel} />
        <Tab label="Stats" className={classes.tabLabel} />
      </Tabs>
      <PokemonPageTabsGeneral pokemon={pokemon} value={value} />
      <PokemonPageTabsStats pokemon={pokemon} value={value} />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  tabLabel: {
    fontWeight: "bold",
  },
}));
