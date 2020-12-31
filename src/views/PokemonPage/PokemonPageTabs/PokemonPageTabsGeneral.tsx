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
  tabIndex: number;
} & PokemonPageTabsProps;

export const PokemonPageTabsGeneral: React.FC<PokemonPageTabsGeneralProps> = ({
  pokemon,
  tabIndex,
  species,
}: PokemonPageTabsGeneralProps) => {
  const classes = useStyles();

  const heightInMeters = React.useMemo(() => Number(pokemon.height / 10), [
    pokemon,
  ]);

  const weightInKgs = React.useMemo(() => Number(pokemon.weight / 10), [
    pokemon,
  ]);

  const descriptionText = React.useMemo(() => {
    return species.flavor_text_entries.find(
      (text) => text.language.name === "en"
    )?.flavor_text;
  }, [species]);

  return (
    <Display enable={tabIndex === 0}>
      <Grid container justify="space-between" alignContent="center">
        <Display enable={!!descriptionText}>
          <Typography className={classes.sectionTitle}>Description</Typography>
          <Typography className={classes.labelText}>
            {descriptionText}
          </Typography>
        </Display>
        <Typography className={classes.sectionTitle}>Physical</Typography>
        <TableLabel label="Height" value={`${heightInMeters} m`} />
        <TableLabel label="Weight" value={`${weightInKgs} kg`} />
        <Typography className={classes.sectionTitle}>Types</Typography>
        <Grid container direction="row" spacing={1}>
          {pokemon.types.map((t: PokemonType, index: number) => (
            <Grid item key={`${pokemon.id}_${t.type.name}`}>
              <Typography className={classes.labelText}>
                {Capitalize(t.type.name)}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography className={classes.sectionTitle}>Abilities</Typography>
        <Grid container direction="row" spacing={1}>
          {pokemon.abilities.map((a: PokemonAbility) => (
            <Grid item key={`${pokemon.id}_${a.ability.name}`}>
              <Typography className={classes.labelText}>
                {`${Capitalize(a.ability.name)}`}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Display>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    color: ThemeConfig.Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    [theme.breakpoints.up("md")]: {
      fontSize: 18,
    },
    paddingTop: 8,
  },
  labelText: {
    paddingRight: theme.spacing(1),
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: "normal",
  },
}));
