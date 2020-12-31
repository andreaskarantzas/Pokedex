/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, LinearProgress, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonPageTabsProps } from "./PokemonPageTabs";
import { PokemonStat } from "../../../types/PokemonStat";
import { Display } from "../../../components/Display/Display";
import { TableLabel } from "../../../components/Labels/TableLabel";
import { Capitalize } from "../../../Util/Capitalize";

export type NormalizedStat = {
  min: number;
  max: number;
};

export type PokemonPageTabsStatItemProps = {
  stat: PokemonStat;
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "darkslategrey",
  },
}))(LinearProgress);

export const PokemonPageTabsStatItem: React.FC<PokemonPageTabsStatItemProps> = ({
  stat,
}: PokemonPageTabsStatItemProps) => {
  const classes = useStyles();

  /** resource for the following calculations:
   * https://www.smogon.com/dp/articles/normalized_stats
   * **/
  const getMinMax = React.useMemo(() => {
    if (stat.stat.name === "hp") {
      const min = 2 * stat.base_stat + 141;
      const max = 2 * stat.base_stat + 204;
      return { min, max };
    } else {
      const min = 2 * stat.base_stat + 36;
      const max = 2 * stat.base_stat + 99;
      return { min, max };
    }
  }, [stat]);

  const getNormalisedValue = React.useMemo(() => {
    const value = stat.stat.name === "hp" ? 110 : 5;
    const actualStat =
      stat.base_stat * 2 + 31 + value + Math.floor(stat.effort / 4);
    return (100 * actualStat) / Math.max(getMinMax.max, 1);
  }, [stat, getMinMax]);

  const labelText = React.useMemo(() => {
    return `${Capitalize(stat.stat.name)} (min. ${getMinMax.min}, max. ${
      getMinMax.max
    })`;
  }, [stat, getMinMax]);

  return (
    <Grid container key={stat.stat.name}>
      <TableLabel label={labelText} />
      <Grid item xs={12} className={classes.barContainer}>
        <BorderLinearProgress
          variant="determinate"
          value={getNormalisedValue}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  barContainer: {
    padding: "8px 0px",
  },
}));
