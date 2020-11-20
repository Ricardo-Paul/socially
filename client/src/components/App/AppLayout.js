import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";

// pages
import Home from "../../pages/Home";

/**
 * renders the app building blocks
 * and all the app routes
 */

const AppLayout = () => {
  return (
    <>
      Header
      <Switch>
        <Route exact path={Routes.HOME} component={Home} />
        <Route />
      </Switch>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
