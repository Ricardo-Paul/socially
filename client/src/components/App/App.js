import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//layouts
import AppLayout from "./AppLayout";
import AuthLayout from "../../pages/Auth/AuthLayout";
import { GET_AUTH_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";
import ScrollTop from "./ScrollTop";
import { NOTIFICATION_CREATED_OR_DELETED } from "../../graphql/notification";

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
  const { loading, data, error, subscribeToMore, refetch } = useQuery(GET_AUTH_USER);

  // we use subscribeToMore to execute our subscriptions
  // and push updates to the original query result (data.getAuthUser)
  useEffect(() => {
    // unsubscribe var handles subscriptions
    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_CREATED_OR_DELETED,
      updateQuery: (prev, { subscriptionData }) => { //first result is cached in prev
        if(!subscriptionData.data) return prev;
        let { operation, notification } = subscriptionData.data.notificationCreatedOrDeleted;

        // dont notifify users if they are already on the notification page
        if(operation === "CREATE"){
          const currentWindow = window.location.href.split("/")[3];
          if(currentWindow === "notifications") return prev;
        };

        // combine new and previous notifications
        let newNotifications = [notification, ...prev.getAuthUser.notifications];

        // attach new notifications to authUser
        let authUser = prev.getAuthUser;
        authUser.notifications = newNotifications;

        // reassign the inial query
        return { getAuthUser: authUser };
      }
    });

    // clean up
    return () => {
      unsubscribe();
    }
  })

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
