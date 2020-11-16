import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthLayout from '../../pages/Auth/AuthLayout';

//layouts
import AppLayout from './AppLayout';

/**
 * as the app top level component
 * we render everything inside BrowserRouter
 */

/**
 * root component of our front-end
 * responsible for global authentication
 * and rendering app global layout
 */

 /**
  * @AuthLayout for unauthenticated user
  * @AppLayout for authenticated user
  */

const App = () => {

    return(
        <Router>
            <Switch>
                <Route  exact component={AuthLayout} />
                <Route exact component={AppLayout} />
            </Switch>
        </Router>
    );
}

export default App;

//use exact to disable the partial matching
// of the route
// 