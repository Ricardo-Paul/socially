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
  const { loading, data, error, subscribeToMore, refetch } = useQuery(
    GET_AUTH_USER
  );
  console.log("AUTH USER", data);

  // we use subscribeToMore to execute our subscriptions
  // and push updates to the original query result (data.getAuthUser)
  useEffect(() => {
    // unsubscribe var handles subscriptions
    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_CREATED_OR_DELETED,
      updateQuery: (prev, { subscriptionData }) => {
        //first result is cached in prev
        if (!subscriptionData.data) return prev;
        let {
          operation,
          notification,
        } = subscriptionData.data.notificationCreatedOrDeleted;

        // combine new and previous notifications
        let newNotifications = [
          notification,
          ...prev.getAuthUser.notifications,
        ];

        // dont notifify users if they are already on the notification page
        if (operation === "CREATE") {
          const currentWindow = window.location.href.split("/")[3];
          if (currentWindow === "notifications") return prev;
        }

        if (operation === "DELETE") {
          console.log("THE NOTIFICATION :", notification);
          let oldNotifications = prev.getAuthUser.notifications;
          // find the notification index and remove it
          let index = oldNotifications.findIndex(
            (n) => n.id === notification.id
          );
          if (index > -1) {
            oldNotifications.splice(index, 1);
            console.log("INDEX: ", index, "should spliced");
          }
          let notifications = oldNotifications;

          // reassign notifications (with the deletion)
          newNotifications = notifications;
        }

        // attach new notifications to authUser
        let authUser = prev.getAuthUser;
        authUser.notifications = newNotifications;

        // reassign the inial query
        return { getAuthUser: authUser };
      },
    });

    // clean up
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  if(error){
    return(
      <h3> Something went wrong, please bear with us since we're still in develoment, we're woring to fix this </h3>
    )
  }

  return (
    <Router>
      <Switch>
        <ScrollTop>
          {!loading && data.getAuthUser ? ( //authUser prop is available on the layout
            <Route
              exact
              render={() => <AppLayout authUser={data.getAuthUser} />}
            />
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
