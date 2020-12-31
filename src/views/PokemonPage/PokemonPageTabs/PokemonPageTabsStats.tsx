/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { LinearProgress, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonPageTabsProps } from "./PokemonPageTabs";
import { PokemonStat } from "../../../types/PokemonStat";
import { Display } from "../../../components/Display/Display";
import { TableLabel } from "../../../components/Labels/TableLabel";
import { Capitalize } from "../../../Util/Capitalize";

export type PokemonPageTabsStatsProps = {
  value: number;
} & PokemonPageTabsProps;

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

export const PokemonPageTabsStats: React.FC<PokemonPageTabsStatsProps> = ({
  pokemon,
  value,
}: PokemonPageTabsStatsProps) => {
  const classes = useStyles();

  return (
    <Display enable={value === 1}>
      {pokemon.stats.map((s: PokemonStat) => (
        <div key={s.stat.name}>
          <TableLabel
            label={Capitalize(s.stat.name)}
            value={`${s.base_stat}`}
          />
          <div className={classes.barContainer}>
            <BorderLinearProgress variant="determinate" value={s.base_stat} />
          </div>
        </div>
      ))}
    </Display>
  );
};

const useStyles = makeStyles((theme) => ({
  barContainer: {
    padding: "0px 16px 8px 16px",
  },
}));
