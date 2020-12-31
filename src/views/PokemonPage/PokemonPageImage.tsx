/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import ThemeConfig from "../../Theme";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon } from "../../types/Pokemon";

export type PokemonPageImageProps = {
  pokemon: Pokemon;
};

export const PokemonPageImage: React.FC<PokemonPageImageProps> = ({
  pokemon,
}: PokemonPageImageProps) => {
  const classes = useStyles();

  const backgroundColor = React.useMemo(() => {
    const [[, backgroundColor]] = Object.entries(ThemeConfig.Colors).filter(
      ([key, _]) => key === pokemon?.types[0].type.name
    );
    return backgroundColor || ThemeConfig.Colors.warmGrey;
  }, [pokemon]);

  const imageResource = React.useMemo(
    () => `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
    [pokemon]
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      className={classes.container}
      style={{
        backgroundColor,
        background: `linear-gradient(rgba(0,0,0,0.9) 0%, ${backgroundColor} 70%, ${backgroundColor} 100%)`,
      }}
    >
      <Grid container justify="center" alignContent="center">
        <img
          src={imageResource}
          alt="pokemon front"
          className={classes.image}
        />
      </Grid>
      <Grid container justify="flex-end">
        <Typography
          className={classes.identifier}
        >{`#${pokemon.id}`}</Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 16,
    padding: 32,
    position: "relative",
  },
  image: {
    width: "60%",
  },
  identifier: {
    position: "absolute",
    bottom: 0,
    left: 16,
    color: ThemeConfig.Colors.white30,
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 64,
  },
}));
