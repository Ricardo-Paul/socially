import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";
import Sidebar from './Sidebar';
import { colors } from '../../utils/theme';

// actions
import {SET_AUTH_USER} from '../../store/auth';

// hooks
import useWindowSize from "../../hooks/useWindowSize";
import { useStore } from "../../store";
import Hidden from '@material-ui/core/Hidden';

// pages
import Home from "../../pages/Home";
import AppHeader from "./AppHeader/AppHeader";
import { theme } from "../../utils/theme";
import { Grid, makeStyles, CssBaseline } from "@material-ui/core";

const appLayoutStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '1px solid slategrey'
    }
  },
  
  middle: {
    backgroundColor: colors.indigo4,
    paddingTop: 60, // use that for all grid item
    padding: 10
  },

  grid: {
    position:"relative",

  },
  root: {
    backgroundColor: colors.indigo1,
    color: colors.indigo9,
    [theme.breakpoints.down("xs")]:{
    },
  },

  // sidebar/ control mobile display
  sidebar:{
    backgroundColor: colors.white,
    paddingLeft: 20,
    display: "none",
    [theme.breakpoints.down("sm")]:{
      display: "block"
    },
    //show the sidbar from medium all the way up

  },
  suggestions:{
    // backgroundColor: "orange"
  },

  gridItem:{
    paddingTop: 60, // use that for all grid item
    height: "100vh",
  },
}))

/**
 * 
 * 
 */
const AppLayout = ({ authUser }) => {
  const [{auth}, dispatch] = useStore();

  const windowSize = useWindowSize();
  const isDesktop = windowSize.width >= parseInt(theme.screen.md);

  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const classes = appLayoutStyles();
// sidebar is stable in the layout
// drawer can be toggled

  useEffect(() => {
    dispatch({
      type: SET_AUTH_USER,
      payload: authUser
    })
  }, [authUser, dispatch]); // dispatch and authUser used as dependencies

  return (
    <>
    <AppHeader toggleSidbar={() => setIsSidebarOpen(!isSidebarOpen)} />

    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>

        {/* hidden on mobile */}
        <Hidden smDown>
        <Grid item md={3} xs={12} className={classes.sidebar} className={classes.gridItem}>
            <Sidebar />
        </Grid>
        </Hidden>

        {/* Middle */}
        <Grid item md={6} xs={12} className={classes.gridItem} className={classes.middle}>
          <Switch>
            <Route exact path={Routes.HOME} render={ () => <Home /> } />
            <Redirect to={Routes.HOME} />
        </Switch>
        </Grid>

        {/* hidden on mobile */}
        <Hidden smDown>
          <Grid item md={3} xs={12} className={classes.suggestions} className={classes.gridItem}>
            User suggestions
          </Grid>
        </Hidden>
      </Grid>
    </div>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
