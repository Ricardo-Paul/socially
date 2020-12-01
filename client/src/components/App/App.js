import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//layouts
import AppLayout from "./AppLayout";
import AuthLayout from "../../pages/Auth/AuthLayout";
import { GET_AUTH_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";
import ScrollTop from "./ScrollTop";

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
 * @AppLayout for authenticated user        {!loading && data.getAuthUser ? (
          <Route exact render={() => <AppLayout authUser={data.getAuthUser} />}  />
        ) : (
          <Route exact render={() => <AuthLayout refetch={refetch} />} />
        )}
 */

/**
 * @AuthUser render layouts based on
 * user auth
 */

const App = () => {
  const { loading, data, error, refetch } = useQuery(GET_AUTH_USER);

  useEffect(() => {
    console.log("Authenticated User :", data);
    console.log("ERROR", error);
    console.log("LOADING: ", loading);
  });

  return (
    <Router>
      <Switch>
        <ScrollTop>
          {!loading && data.getAuthUser ? ( //authUser prop is available on the layout
           <Route exact render={() => <AppLayout authUser={data.getAuthUser} />} />
          ) : (
            <Route exact render={() => <AuthLayout refetch={refetch} />} />
          )}
        </ScrollTop>
      </Switch>
    </Router>
  );
};

export default App;

//use exact to disable the partial matching
// of the route

// instead of manually redirect the user
// after login we use the refetch method to refresh
// the page...
// once the token is detected we render the
// <AppLayout> Layout
