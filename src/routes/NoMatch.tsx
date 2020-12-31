/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import NoMatchPage from "../assets/Images/404.jpg";
import { makeStyles } from "@material-ui/core/styles";
import ThemeConfig from "../Theme";
import { useHistory } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";

export type NoMatchProps = {};

export const NoMatch: React.FC<NoMatchProps> = (_: NoMatchProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handlePress = React.useCallback(() => {
    history.push(`/`);
  }, [history]);

  return (
    <Grid
      container
      justify="center"
      alignContent="flex-start"
      className={classes.container}
    >
      <img src={NoMatchPage} alt="pokemon front" className={classes.image} />
      <Grid
        container
        className={classes.controlsContainer}
        justify="center"
        alignContent="center"
      >
        <Button color={"primary"} onClick={handlePress}>
          <ArrowBack />
          <Typography className={classes.text}>
            Take me back to the homepage to catch some Pokémons!
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: ThemeConfig.Colors.white,
  },
  image: {
    paddingTop: 48,
    width: "60%",
  },
  controlsContainer: {
    paddingTop: theme.spacing(4),
  },
  text: {
    paddingLeft: theme.spacing(2),
    fontWeight: 900,
    fontStyle: "italic",
    fontFamily: "Montserrat",
  },
}));
