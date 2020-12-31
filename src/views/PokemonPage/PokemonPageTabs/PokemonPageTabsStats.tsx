/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { PokemonPageTabsProps } from "./PokemonPageTabs";
import { PokemonStat } from "../../../types/PokemonStat";
import { Display } from "../../../components/Display/Display";
import { PokemonPageTabsStatItem } from "./PokemonPageTabsStatItem";
import { Typography } from "@material-ui/core";

export type PokemonPageTabsStatsProps = {
  tabIndex: number;
} & PokemonPageTabsProps;

export const PokemonPageTabsStats: React.FC<PokemonPageTabsStatsProps> = ({
  pokemon,
  tabIndex,
}: PokemonPageTabsStatsProps) => {
  return (
    <Display enable={tabIndex === 1}>
      {pokemon.stats.map((s: PokemonStat) => (
        <PokemonPageTabsStatItem key={s.stat.name} stat={s} />
      ))}
      <Typography variant="caption">
        Learn more on how the stat values are calculated{" "}
        <a href="https://www.smogon.com/dp/articles/normalized_stats">here</a>.
      </Typography>
    </Display>
  );
};
