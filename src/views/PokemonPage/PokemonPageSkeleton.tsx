/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

export const PokemonPageSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.skeletonImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.skeletonText}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  skeletonImage: {
    height: window.innerHeight * 0.33,
  },
  skeletonText: {
    padding: theme.spacing(2),
  },
}));
