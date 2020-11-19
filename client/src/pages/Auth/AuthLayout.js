import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as Routes from "../../routes";

// Auth pages
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

/**
 * The Auth layout returns routes for user authentication
 * meaning when not signed in (signin/signup/reset password)
 */

const AuthLayout = ({ refetch }) => {
  return (
    <Switch>
      <Route exact path={Routes.HOME} render={() => <SignUp refetch={refetch} />} />
      <Route exact path={Routes.SIGNIN} render={() => <SignIn />} />
      <Route exact path={Routes.FORGOT_PASSWORD} render={() => <ForgotPassword />} />
      <Route exact path={Routes.RESET_PASSWORD} component={ResetPassword} />
      <Redirect to={Routes.HOME} />
    </Switch>
  );
};

export default AuthLayout;
