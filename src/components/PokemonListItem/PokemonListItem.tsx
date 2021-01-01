/**
 * Created by andreaskarantzas on 29.12.20.
 */
import React from "react";
import {
  StyledComponentProps,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Pokemon } from "../../types/Pokemon";
import ThemeConfig from "../../Theme";
import { getColorValueByKey } from "../../Theme/Colors";
import { Capitalize } from "../../Util/Capitalize";

interface PokemonListItemProps extends StyledComponentProps {
  pokemon: Pokemon;
}

export const PokemonListItem: React.FC<PokemonListItemProps> = ({
  pokemon,
}: PokemonListItemProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handlePress = () => {
    history.push(`/pokemon/${pokemon.id}`);
  };

  /** grab the correct color from a static list **/
  const backgroundColor = React.useMemo(() => {
    if (pokemon.types.length > 0) {
      const name = pokemon.types[0].type.name;
      if (name) {
        return getColorValueByKey(name) || ThemeConfig.Colors.warmGrey;
      }
      return ThemeConfig.Colors.warmGrey;
    }
    return ThemeConfig.Colors.warmGrey;
  }, [pokemon]);

  /** instead of the default sprites, we fetch an nicer version
   * from the available pokeres api **/
  const imageResource = React.useMemo(
    () => `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
    [pokemon]
  );

  return (
    <Box
      boxShadow={6}
      bgcolor="background.paper"
      className={classes.boxContainer}
    >
      <Grid
        key={pokemon.id}
        id={pokemon.name}
        item
        className={classes.container}
        style={{
          backgroundColor,
          background: `linear-gradient(rgba(0,0,0,0.9) 0%, ${backgroundColor} 70%, ${backgroundColor} 100%)`,
        }}
        onClick={handlePress}
      >
        <Grid container alignContent="flex-start">
          <Typography variant="h4" className={classes.text}>{`${Capitalize(
            pokemon.name
          )}`}</Typography>
        </Grid>
        <Grid container direction="column" alignContent="flex-end" spacing={4}>
          <Grid item className={classes.imageContainer}>
            <img
              src={imageResource}
              alt="pokemon front"
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Typography
            className={classes.identifier}
          >{`#${pokemon.id}`}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  boxContainer: {
    padding: 0,
    borderRadius: 16,
  },
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    position: "relative",
  },
  identifierContainer: {
    padding: theme.spacing(2),
  },
  identifier: {
    position: "absolute",
    bottom: 0,
    left: theme.spacing(2),
    color: ThemeConfig.Colors.white20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 64,
  },
  text: {
    color: ThemeConfig.Colors.white,
    fontStyle: "italic",
  },
  imageContainer: {
    height: 296,
  },
  image: {
    padding: "24px 0px",
    width: 244,
  },
}));
