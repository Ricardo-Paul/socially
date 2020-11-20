import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as Routes from "../../routes";

// pages
import Home from "../../pages/Home";

/**
 * The App layout returns routes for authentified user
 * 
 */
const AppLayout = () => {
  return (
    <>
      APP HOME HEADER
      <Switch>
        <Route exact path={Routes.HOME} render={ () => <Home /> } />
        <Redirect to={Routes.HOME} />
      </Switch>
    </>
  );
};

// give AppLayout access to path, location and history
// we'll use location to access location.pathname
export default withRouter(AppLayout);
