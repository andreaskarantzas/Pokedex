/**
 * Created by andreaskarantzas on 29.12.20.
 */
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Fab, Theme } from "@material-ui/core";
import Backpack from "../../assets/Images/backpack.png";
import { makeStyles } from "@material-ui/core/styles";

export const FabButton: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleMyBagPress = React.useCallback(() => {
    history.push(`/my-bag`);
  }, [history]);

  const displayFab = React.useMemo(
    () => !location.pathname.includes("/my-bag"),
    [location]
  );

  if (displayFab) {
    return (
      <Fab
        id="fab_bag"
        onClick={handleMyBagPress}
        className={classes.container}
        size="large"
      >
        <img src={Backpack} className={classes.backpackImage} alt="backpack" />
      </Fab>
    );
  }
  return null;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    backgroundColor: "darkslategray",
  },
  backpackImage: {
    height: 40,
  },
}));
