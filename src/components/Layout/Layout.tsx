/**
 * Created by andreaskarantzas on 30.12.20.
 */
import React from "react";
import {
  StyledComponentProps,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { LayoutAppBar } from "./LayoutAppBar";
import { createMuiTheme } from "@material-ui/core";
import { FabButton } from "../Buttons/FabButton";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, 'Roboto', Arial",
  },
});

interface LayoutProps extends StyledComponentProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const classes = styles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <LayoutAppBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
          <FabButton />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    paddingBottom: theme.spacing(2),
  },
  appBarSpacer: theme.mixins.toolbar,
}));
