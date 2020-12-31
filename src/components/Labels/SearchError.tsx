/**
 * Created by andreaskarantzas on 29.12.20.
 */
import React from "react";
import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThemeConfig from "../../Theme";

export type SearchErrorProps = {
  query?: string;
};

export const SearchError: React.FC<SearchErrorProps> = ({
  query,
}: SearchErrorProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignContent="flex-start"
      className={classes.container}
    >
      <Typography
        className={classes.label}
      >{`No Pokémons found for: ${query}`}</Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
  },
  label: {
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: "bold",
  },
}));
