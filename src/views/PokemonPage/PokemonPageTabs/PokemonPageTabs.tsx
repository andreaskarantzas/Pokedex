/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon } from "../../../types/Pokemon";
import { PokemonPageTabsGeneral } from "./PokemonPageTabsGeneral";
import { PokemonPageTabsStats } from "./PokemonPageTabsStats";
import { PokemonSpecies } from "../../../types/PokemonSpecies";

export type PokemonPageTabsProps = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

export const PokemonPageTabs: React.FC<PokemonPageTabsProps> = ({
  pokemon,
  species,
}: PokemonPageTabsProps) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: any, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Grid item xs={12} sm={6} className={classes.container}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="General" className={classes.tabLabel} />
        <Tab label="Stats" className={classes.tabLabel} />
      </Tabs>
      <PokemonPageTabsGeneral
        pokemon={pokemon}
        tabIndex={tabIndex}
        species={species}
      />
      <PokemonPageTabsStats
        pokemon={pokemon}
        tabIndex={tabIndex}
        species={species}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
    },
  },
  tabLabel: {
    fontWeight: "bold",
  },
}));
