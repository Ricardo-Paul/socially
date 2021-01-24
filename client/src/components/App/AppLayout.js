import React, { useEffect, lazy, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import * as Routes from "../../routes";
import Navigation from "./Navigation";
import { colors as appColors } from "../../utils/theme";


// ACTION
import { SET_AUTH_USER } from "../../store/auth";

// HOOKS
import { useStore } from "../../store";

// APP PAGES
// import Home from "../../pages/Home";
// import People from "../../pages/People/";
// import Profile from "../../pages/Profile";
// import Message from "../../pages/Message";
// import Notifications from "../../pages/Notifications";
// import About from "../../pages/About";
// import Browse from "../../pages/Browse";
// import Post from "../../pages/Post";

import AppHeader from "./AppHeader/AppHeader";
import { Grid, makeStyles, CssBaseline, Drawer } from "@material-ui/core";
import { PageContainer } from "../pageContainer";

const Profile = lazy(() => import("../../pages/Profile"));
const Home = lazy(() => import("../../pages/Home"));
const People = lazy(() => import("../../pages/People"));
const Message = lazy(() => import("../../pages/Message"));
const Notifications = lazy(() => import("../../pages/Notifications"));
const About = lazy(() => import("../../pages/About"));
const Browse = lazy(() => import("../../pages/Browse"));
const Post = lazy(() => import("../../pages/Post"));


const useStyles = makeStyles((theme) => ({
  // "@global": {
  //   "*::-webkit-scrollbar": {
  //     width: "0.4em",
  //     height: "0.4em",
  //   },
  //   "*::-webkit-scrollbar-thumb": {
  //     backgroundColor: "rgba(0,0,0,.4)",
  //     outline: "1px solid slategrey",
  //   },
  // },

  middle: {
    paddingTop: 80,
    paddingLeft: 256,
    paddingRight: 25,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  extreme: {
    paddingTop: 60,
    backgroundColor: appColors.black,
    position: "relative",
  },
  desktopDrawer: {
    top: 70,
    height: "calc(100% - 64px)",
    width: 256,
    zIndex: 100,
  },
  grid: {
    height: "100%",
  },
}));

/**
 *
 */
const AppLayout = ({ authUser }) => {
  const [, dispatch] = useStore();
  const classes = useStyles();

  // auth user available in app global store
  useEffect(() => {
    dispatch({
      type: SET_AUTH_USER,
      payload: authUser,
    });
  }, [authUser, dispatch]);

  const renderRoutes = () => {
    return (
      <React.Fragment>
        <AppHeader />
          <CssBaseline />
          <Grid container className={classes.grid}>
            {/* hidden on mobile */}
            <Hidden smDown>
              <Drawer open variant="persistent" classes={{ paper: classes.desktopDrawer }}>
                <Navigation />
              </Drawer>
            </Hidden>
  
            <Grid item xl={10} lg={12} xs={12} className={classes.middle}>
              <PageContainer>
                <Switch>
                  <Route exact path={Routes.HOME} render={() => <Home />} />
                  <Route exact path={Routes.PEOPLE} render={() => <People />} />
                  <Route exact path={Routes.PROFILE} render={() => <Profile />} />
                  <Route exact path={Routes.MESSAGE} render={() => <Message />} />
                  <Route exact path={Routes.NOTIFICATIONS} render={() => <Notifications />} />
                  <Route exact path={Routes.BROWSE} render={() => <Browse />} />
                  <Route exact path={Routes.ABOUT} render={() => <About />} />
                  <Route exact path={Routes.POST} render={() => <Post />} />
                  <Redirect to={Routes.HOME} />
                </Switch>
              </PageContainer>
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }

  return(
    <Suspense fallback={<div> SUSPENSE ... </div>}>
      {renderRoutes()}
    </Suspense>
  )

};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
