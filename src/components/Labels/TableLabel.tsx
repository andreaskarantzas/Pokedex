/**
 * Created by andreaskarantzas on 29.12.20.
 */
import React from "react";
import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThemeConfig from "../../Theme";

export type TableLabelProps = {
  label: string;
  value: string;
};

export const TableLabel: React.FC<TableLabelProps> = ({
  label,
  value,
}: TableLabelProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignContent="center"
      className={classes.container}
    >
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: "0px 16px 8px 16px",
  },
  label: {
    color: ThemeConfig.Colors.warmestGrey,
    fontWeight: "bold",
  },
  value: {
    color: ThemeConfig.Colors.charcoalGrey,
    fontWeight: "normal",
  },
}));
