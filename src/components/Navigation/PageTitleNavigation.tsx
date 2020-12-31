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
      <Display enable={canGoBack}>
        <IconButton
          color="secondary"
          onClick={handleBack}
          className={classes.iconContainer}
        >
          <ArrowBack className={classes.backIcon} />
        </IconButton>
      </Display>
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: 900,
    fontStyle: "italic",
    fontFamily: "Montserrat",
  },
  iconContainer: {
    marginRight: theme.spacing(2),
  },
  backIcon: {
    fontSize: 48,
  },
}));
