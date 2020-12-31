/**
 * Created by andreaskarantzas on 30.12.20.
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Link } from "@material-ui/core";
import PokemonLogo from "../../assets/Images/pokemon_logo.png";
import GitHubLogo from "../../assets/Images/gitHub_logo.png";
import ThemeConfig from "../../Theme";

export const LayoutAppBar: React.FC = () => {
  const classes = styles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Grid
        container
        alignContent="center"
        justify="space-between"
        className={classes.innerContainer}
      >
        <Grid item>
          <Link href="/">
            <img
              src={PokemonLogo}
              className={classes.image}
              alt="pokemon logo"
            />
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GitHubLogo} className={classes.image} alt="github logo" />
          </Link>
        </Grid>
      </Grid>
    </AppBar>
  );
};

const styles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: ThemeConfig.Colors.errorColor,
    color: ThemeConfig.Colors.white,
  },
  innerContainer: {
    padding: "8px, 16px",
  },
  image: {
    height: 56,
    padding: "8px 16px",
  },
}));
