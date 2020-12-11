import React, { useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";
import Navigation from "./Navigation";
import { colors } from "../../utils/theme";

// actions
import { SET_AUTH_USER } from "../../store/auth";

// hooks
import { useStore } from "../../store";
import Hidden from "@material-ui/core/Hidden";

// pages
import Home from "../../pages/Home";
import People from "../../pages/People/";

import AppHeader from "./AppHeader/AppHeader";
import { Grid, makeStyles, CssBaseline, Drawer } from "@material-ui/core";

const appLayoutStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
  },

  middle: {
    paddingTop: 80,
    height: "100vh",
    paddingLeft: 256,
    // overflow: "auto",
    // backgroundColor: colors.lightGrey,
    paddingRight: 25,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  extreme: {
    paddingTop: 60,
    backgroundColor: colors.black,
    position: "relative",
  },
  desktopDrawer: {
    top: 64,
    height: "calc(100% - 64px)",
    width: 256,
  },
}));

/**
 *
 *
 */
const AppLayout = ({ authUser }) => {
  const [{ auth }, dispatch] = useStore();

  const classes = appLayoutStyles();

  useEffect(() => {
    dispatch({
      type: SET_AUTH_USER,
      payload: authUser,
    });
  }, [authUser, dispatch]); // dispatch and authUser used as the effect dependencies

  return (
    <>
      <AppHeader />

      <div className={classes.root}>
        <CssBaseline />
        <Grid container className={classes.grid}>
          {/* hidden on mobile */}
          <Hidden smDown>
              <Drawer
                open
                variant="persistent"
                classes={{ paper: classes.desktopDrawer }}
              >
                <Navigation />
              </Drawer>
          </Hidden>

          {/* Middle */}
          <Grid item md={10} xs={12} className={classes.middle}>
            <Switch>
              <Route exact path={Routes.HOME} render={() => <Home />} />
              <Route exact path={Routes.PEOPLE} render={() => <People />} />
              {/* redirect to PEOPLE for development purpose */}
              <Redirect to={Routes.PEOPLE} />
            </Switch>
          </Grid>

          {/* hidden on mobile */}
          {/* <Hidden smDown>
            <Grid item md={3} xs={12} className={classNames([classes.extreme])}>
              User suggestions
            </Grid>
          </Hidden> */}
        </Grid>
      </div>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
