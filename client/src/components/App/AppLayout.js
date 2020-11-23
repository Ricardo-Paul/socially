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
  
  grid: {
    position:"relative",

  },
  root: {
    backgroundColor: colors.black,
    color: colors.lighRed,
    [theme.breakpoints.down("xs")]:{
    },
  },

  sidebar:{
    paddingLeft: 20,
    display: "none",
    [theme.breakpoints.up("sm")]:{
      display: "block"
    },
    height: "100vh",
    //show the sidbar from medium all the way up

  },
  middle: {
    backgroundColor: colors.darkGrey
  },
  suggestions:{
    // backgroundColor: "orange"
  }
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
  }, [authUser, dispatch]);

  return (
    <>
    <AppHeader toggleSidbar={() => setIsSidebarOpen(!isSidebarOpen)} />

    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>
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
    </div>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
