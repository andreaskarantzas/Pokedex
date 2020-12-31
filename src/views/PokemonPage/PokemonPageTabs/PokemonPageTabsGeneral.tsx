/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonPageTabsProps } from "./PokemonPageTabs";
import ThemeConfig from "../../../Theme";
import { Display } from "../../../components/Display/Display";
import { TableLabel } from "../../../components/Labels/TableLabel";
import { PokemonType } from "../../../types/PokemonType";
import { Capitalize } from "../../../Util/Capitalize";
import { PokemonAbility } from "../../../types/PokemonAbility";

export type PokemonPageTabsGeneralProps = {
  value: number;
} & PokemonPageTabsProps;

export const PokemonPageTabsGeneral: React.FC<PokemonPageTabsGeneralProps> = ({
  pokemon,
  value,
}: PokemonPageTabsGeneralProps) => {
  const classes = useStyles();

  const heightInMeters = React.useMemo(() => Number(pokemon.height / 10), [
    pokemon,
  ]);

  const weightInKgs = React.useMemo(() => Number(pokemon.weight / 10), [
    pokemon,
  ]);

  return (
    <Display enable={value === 0}>
      <Grid
        container
        justify="space-between"
        alignContent="center"
        className={classes.root}
      >
        <Typography className={classes.label}>Physical</Typography>
        <TableLabel label="Height" value={`${heightInMeters} m`} />
        <TableLabel label="Weight" value={`${weightInKgs} kg`} />
        <Typography className={classes.label}>Types</Typography>
        {pokemon.types.map((t: PokemonType, index: number) => (
          <Grid container key={`${pokemon.id}_${t.type.name}`}>
            <TableLabel
              label={`Type ${index + 1}`}
              value={Capitalize(t.type.name)}
            />
          </Grid>
        ))}
        <Typography className={classes.label}>Abilities</Typography>
        {pokemon.abilities.map((a: PokemonAbility, index: number) => (
          <Grid container key={`${pokemon.id}_${a.ability.name}`}>
            <TableLabel
              label={`Ability ${index + 1}`}
              value={Capitalize(a.ability.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Display>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  title: {
    color: ThemeConfig.Colors.black,
    fontWeight: "bold",
  },
  text: {
    color: ThemeConfig.Colors.warmestGrey,
    fontWeight: "normal",
  },
  pokemonTypeContainer: {
    padding: "8px 16px",
  },
  label: {
    color: ThemeConfig.Colors.black,
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
}));
