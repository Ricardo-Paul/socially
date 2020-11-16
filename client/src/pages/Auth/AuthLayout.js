import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Routes from '../../routes';
import SignUp from './SignUp';

/**
 * The Auth layout returns routes for user authentication
 * meaning when not signed in (signin/signup/forget password)
 */

const AuthLayout = ({ refetch }) => {
    return(
        <Switch>
            <Route exact path={Routes.HOME} render={() => <SignUp refetch={refetch} /> } />
            <Redirect to={Routes.HOME} /> 
        </Switch>
    )
}

export default AuthLayout;