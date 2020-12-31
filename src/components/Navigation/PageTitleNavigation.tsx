/**
 * Created by andreaskarantzas on 27.12.20.
 */
import * as React from "react";
import { useCallback } from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ThemeConfig from "../../Theme";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Display } from "../Display/Display";

export type PageTitleNavigationProps = {
  title: string;
  canGoBack?: boolean;
};

export const PageTitleNavigation: React.FC<PageTitleNavigationProps> = ({
  title,
  canGoBack,
}: PageTitleNavigationProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Grid container alignContent="center" direction="row" justify="flex-start">
      <Grid item>
        <Display enable={canGoBack}>
          <IconButton
            color="secondary"
            onClick={handleBack}
            className={classes.iconContainer}
          >
            <ArrowBack className={classes.backIcon} />
          </IconButton>
        </Display>
      </Grid>
      <Grid item>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 32,
    [theme.breakpoints.up("md")]: {
      fontSize: 40,
    },
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: 900,
    fontStyle: "italic",
    fontFamily: "Montserrat",
  },
  iconContainer: {
    marginTop: 2,
    [theme.breakpoints.up("md")]: {
      marginTop: 4,
    },
    marginRight: theme.spacing(1),
  },
  backIcon: {
    fontSize: 24,
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
  },
}));
