/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, Theme, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemons,
  fetchPokemonsByIdOrName,
} from "../../features/pokemonsList/pokemonListSlice";
import { RootState } from "../../app/rootReducer";
import { Pokemon } from "../../types/Pokemon";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonListItem } from "../../components/PokemonListItem/PokemonListItem";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PageTitleNavigation } from "../../components/Navigation/PageTitleNavigation";
import { Display } from "../../components/Display/Display";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [query, setQuery] = useState<string>("");
  const { data, offset, loading } = useSelector(
    (state: RootState) => state.pokemon
  );
  const { autocompleteData } = useSelector(
    (state: RootState) => state.autocomplete
  );

  useEffect(() => {
    data.length <= 1 && dispatch(fetchPokemons());
  }, []);

  const handleQueryChange = React.useCallback(
    (query: string) => {
      setQuery(query.toLowerCase());
      if (query !== "") {
        dispatch(fetchPokemonsByIdOrName(query.toLowerCase()));
      } else {
        dispatch(fetchPokemons());
      }
    },
    [dispatch]
  );

  const handleLoadMore = React.useCallback(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const showError = React.useCallback(() => {
    return query !== "" && data.length === 0 && !loading;
  }, [data, query, loading]);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} lg={8} className={classes.container}>
        <PageTitleNavigation title="Pokédex" />
        <SearchBar
          onValueChange={handleQueryChange}
          query={query}
          label="Search for a Pokémon"
          autocompleteData={autocompleteData}
          autocompleteIdentifier="name"
          error={showError()}
        />
        <Grid
          container
          direction="row"
          spacing={6}
          className={classes.listContainer}
        >
          {data.map((p: Pokemon) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <PokemonListItem pokemon={p} />
            </Grid>
          ))}
        </Grid>
        <Display enable={offset > 0 && !loading}>
          <Grid container justify="center" alignContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
            >
              <Typography className={classes.text}>Load more</Typography>
            </Button>
          </Grid>
        </Display>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 16,
  },
  listContainer: {
    padding: "16px 0px 32px 0px",
    flexGrow: 1,
  },
  text: {
    fontWeight: 900,
    fontStyle: "italic",
  },
}));
