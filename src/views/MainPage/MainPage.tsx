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
import { makeStyles } from "@material-ui/core/styles";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PageTitleNavigation } from "../../components/Navigation/PageTitleNavigation";
import { Display } from "../../components/Display/Display";
import { MainPageContent } from "./MainPageContent";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [query, setQuery] = useState<string>("");
  const { data, offset, loading, error } = useSelector(
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
    return query !== "" && !!error && !loading;
  }, [error, query, loading]);

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
        <MainPageContent data={data} loading={loading} />
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
    padding: theme.spacing(2),
  },
  text: {
    fontWeight: 900,
    fontStyle: "italic",
  },
}));
