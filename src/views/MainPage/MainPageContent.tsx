/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Theme } from "@material-ui/core";
import { Pokemon } from "../../types/Pokemon";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonListItem } from "../../components/PokemonListItem/PokemonListItem";
import Skeleton from "@material-ui/lab/Skeleton";
import ThemeConfig from "../../Theme";
import { Display } from "../../components/Display/Display";

export type MainPageContentProps = {
  loading?: boolean;
  data: Array<Pokemon | undefined>;
};

export const MainPageContent: React.FC<MainPageContentProps> = ({
  data,
  loading,
}: MainPageContentProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={6}
      className={classes.listContainer}
    >
      {data.map((p: Pokemon | undefined, index: number) =>
        p ? (
          <Grid key={p.id} item xs={12} sm={6} md={4}>
            <PokemonListItem pokemon={p} />
          </Grid>
        ) : (
          <Grid key={`pending_${index}`} item xs={12} sm={6} md={4}>
            <Display enable={loading}>
              <Skeleton variant="rect" className={classes.skeletonCard} />
            </Display>
          </Grid>
        )
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  listContainer: {
    padding: "16px 0px 32px 0px",
    flexGrow: 1,
  },
  skeletonCard: {
    backgroundColor: ThemeConfig.Colors.lightGrey,
    borderRadius: 16,
    flexGrow: 1,
    height: 320,
  },
}));
