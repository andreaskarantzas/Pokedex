/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { useCallback } from "react";
import { Button, Grid, Theme, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon } from "../../types/Pokemon";
import {
  addPokemonToBag,
  removePokemonFromBag,
} from "../../features/pokemonBag/pokemonBagSlice";

export type PokemonPageControlsProps = {
  pokemon: Pokemon;
};

export const PokemonPageControls: React.FC<PokemonPageControlsProps> = ({
  pokemon,
}: PokemonPageControlsProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.pokemonBag);
  const pokemonExistsInBag = data.find(
    (p: Pokemon) => p && p.id === pokemon.id
  );

  const handleBagPress = useCallback(() => {
    if (pokemonExistsInBag) {
      dispatch(removePokemonFromBag({ pokemon }));
    } else {
      dispatch(addPokemonToBag({ pokemon }));
    }
  }, [pokemonExistsInBag, dispatch, pokemon]);

  return (
    <Grid
      container
      className={classes.controlsContainer}
      justify="center"
      alignContent="center"
    >
      <Button
        color={pokemonExistsInBag ? "secondary" : "primary"}
        onClick={handleBagPress}
      >
        <Typography className={classes.text}>
          {pokemonExistsInBag ? "Remove from bag" : "Add to my bag"}
        </Typography>
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  controlsContainer: {
    paddingTop: theme.spacing(4),
  },
  text: {
    fontWeight: 900,
    fontStyle: "italic",
    fontFamily: "Montserrat",
  },
}));
