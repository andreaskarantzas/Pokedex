/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { useEffect, useState } from "react";
import { Grid, Theme, Typography } from "@material-ui/core";
import { Pokemon } from "../../types/Pokemon";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonListItem } from "../../components/PokemonListItem/PokemonListItem";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import AppStore from "../../Util/AppStore";
import { PageTitleNavigation } from "../../components/Navigation/PageTitleNavigation";
import ThemeConfig from "../../Theme";

export const BagPage: React.FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>("");
  const [bagData, setBagData] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    loadBagFromStorage();
  }, []);

  const loadBagFromStorage = () => {
    const res = AppStore.get("MyPokemonBag");
    if (res) {
      setBagData(JSON.parse(res));
    }
  };

  const handleQueryChange = React.useCallback((query: string) => {
    setQuery(query);
  }, []);

  const filteredData = React.useCallback((): Array<Pokemon> => {
    return bagData.filter(
      (p: Pokemon) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        String(p.id).includes(query)
    );
  }, [bagData, query]);

  const showError = React.useCallback(() => {
    return query !== "" && filteredData().length === 0;
  }, [filteredData, query]);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} lg={8} className={classes.container}>
        <PageTitleNavigation title="My Bag" canGoBack={true} />
        <Grid container justify="flex-start" alignContent="center">
          <SearchBar
            onValueChange={handleQueryChange}
            query={query}
            label="Search in your bag"
            error={showError()}
          />
          {bagData.length === 0 ? (
            <Typography
              id="empty_bag_text"
              className={classes.label}
            >{`You have no Pokémons in your bag. Select on from the homepage and press "Add to my bag"`}</Typography>
          ) : null}
        </Grid>
        <Grid
          container
          direction="row"
          spacing={6}
          className={classes.listContainer}
        >
          {filteredData().map((p: Pokemon) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <PokemonListItem pokemon={p} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  listContainer: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
  label: {
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: "bold",
  },
}));
