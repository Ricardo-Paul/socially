import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";
import Navigation from './Navigation';
import { colors } from '../../utils/theme';

// actions
import {SET_AUTH_USER} from '../../store/auth';

// hooks
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
    backgroundColor: "grey",
    padding: 10,
  },
  extreme:{
    backgroundColor: colors.black,
  },
  drawer:{ //control mobile display
    backgroundColor: colors.white,
    paddingLeft: 20,
  }
}))

/**
 * 
 * 
 */
const AppLayout = ({ authUser }) => {
  const [{auth}, dispatch] = useStore();

  const classes = appLayoutStyles();

  useEffect(() => {
    dispatch({
      type: SET_AUTH_USER,
      payload: authUser
    })
  }, [authUser, dispatch]); // dispatch and authUser used as dependencies

  return (
    <>
    <AppHeader />

    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>

        {/* hidden on mobile */}
        <Hidden smDown>
        <Grid item md={3} xs={12} className={classes.drawer} className={classes.extreme}>
            <Navigation />
        </Grid>
        </Hidden>

        {/* Middle */}
        <Grid item md={6} xs={12}  className={classes.middle}>
          <Switch>
            <Route exact path={Routes.HOME} render={ () => <Home /> } />
            <Redirect to={Routes.HOME} />
        </Switch>
        </Grid>

        {/* hidden on mobile */}
        <Hidden smDown>
          <Grid item md={3} xs={12} className={classes.suggestions} className={classes.extreme}>
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
