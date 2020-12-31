/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { useEffect, useState } from "react";
import { Grid, Theme } from "@material-ui/core";
import { Pokemon } from "../../types/Pokemon";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonListItem } from "../../components/PokemonListItem/PokemonListItem";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import AppStore from "../../Util/AppStore";
import { PageTitleNavigation } from "../../components/Navigation/PageTitleNavigation";

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

  const filteredData = (): Array<Pokemon> => {
    return bagData.filter((p: Pokemon) =>
      String(p.name || p.id)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  };

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} lg={8} className={classes.container}>
        <PageTitleNavigation title="My Bag" canGoBack={true} />
        <Grid container justify="flex-start" alignContent="center">
          <SearchBar
            onValueChange={handleQueryChange}
            value={query}
            label="Search in your bag"
          />
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
    padding: theme.spacing(4),
  },
  listContainer: {
    paddingTop: theme.spacing(4),
    flexGrow: 1,
  },
}));
