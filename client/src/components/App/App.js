import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//layouts
import AppLayout from './AppLayout';
import AuthLayout from '../../pages/Auth/AuthLayout';
import { GET_AUTH_USER } from '../../graphql/user';
import { useQuery } from '@apollo/client';



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

  /**
   * @AuthUser render layouts based on
   * user auth
   */

const App = () => {
    const { loading, data, error, refetch } = useQuery(GET_AUTH_USER);

    useEffect(() => {
        console.log('Authenticated User :',data);
        console.log('ERROR', error);
        console.log('LOADING: ', loading);
    })
    
    return(
        <Router>
            <Switch>
                {!loading && data.getAuthUser? (
                    <Route exact render={() => <AppLayout authUser={data.getAuthUser} /> } />
                ):(
                    <Route  exact render={() => <AuthLayout refetch={refetch} /> } />
                )}
            </Switch>
        </Router>
    );
}

export default App;

//use exact to disable the partial matching
// of the route