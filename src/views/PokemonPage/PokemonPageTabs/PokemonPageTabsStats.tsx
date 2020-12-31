/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { PokemonPageTabsProps } from "./PokemonPageTabs";
import { PokemonStat } from "../../../types/PokemonStat";
import { Display } from "../../../components/Display/Display";
import { PokemonPageTabsStatItem } from "./PokemonPageTabsStatItem";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export type PokemonPageTabsStatsProps = {
  tabIndex: number;
} & PokemonPageTabsProps;

export const PokemonPageTabsStats: React.FC<PokemonPageTabsStatsProps> = ({
  pokemon,
  tabIndex,
}: PokemonPageTabsStatsProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid xs={12}>
        <Display enable={tabIndex === 1}>
          {pokemon.stats.map((s: PokemonStat) => (
            <PokemonPageTabsStatItem key={s.stat.name} stat={s} />
          ))}
          <Typography variant="caption" className={classes.explanationText}>
            Learn more on how the stat values are calculated{" "}
            <a
              href="https://www.smogon.com/dp/articles/normalized_stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>
        </Display>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
  },
  explanationText: {
    marginTop: theme.spacing(2),
  },
}));
