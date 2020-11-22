import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";

import Sidebar from './Sidebar';
import { MainContainer } from "../Layout";

// hooks
import useWindowSize from "../../hooks/useWindowSize";

// pages
import Home from "../../pages/Home";
import AppHeader from "./AppHeader/AppHeader";
import { theme } from "../../utils/theme";
import { Grid, makeStyles } from "@material-ui/core";

const appLayoutStyles = makeStyles(theme => ({
  sidebar:{
    display: "none",
    backgroundColor: "orange",
    [theme.breakpoints.up("sm")]:{
      display: "block"
    }
    //show the sidbar from medium all the way up

  },
  middle: {
    backgroundColor: "yellow"
  },
  suggestions:{
    backgroundColor: "orange"
  }
}))

/**
 * 
 * 
 */
const AppLayout = () => {
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width >= parseInt(theme.screen.md);

  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const classes = appLayoutStyles();
// sidebar is stable in the layout
// drawer can be toggled

  return (
    <>
    <AppHeader toggleSidbar={() => setIsSidebarOpen(!isSidebarOpen)} />
    <MainContainer>
      <Grid container justify="center" spacing={3}>
        <Grid item md={3} xs={12} className={classes.sidebar}>
            <Sidebar />
        </Grid>
        <Grid item md={6} xs={12} className={classes.middle}>
          <Switch>
            <Route exact path={Routes.HOME} render={ () => <Home /> } />
            <Redirect to={Routes.HOME} />
        </Switch>
        </Grid>
        <Grid item md={3} xs={12} className={classes.suggestions}>
          User suggestions
        </Grid>
      </Grid>
    </MainContainer>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
