import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import { GET_AUTH_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";
import { NOTIFICATION_CREATED_OR_DELETED } from "../../graphql/notification";
import { GET_NEW_CONVERSATIONS } from "../../graphql/message";
import Loading from "../../pages/Loading/Loading";
import { useTheme } from "@material-ui/core";
import * as Routes from "./../../routes";

const AppLayout = React.lazy(() => import("./AppLayout"));
const AuthLayout = React.lazy(() => import("../../pages/Auth/AuthLayout"))

const App = () => {

  const { loading, data, error, subscribeToMore, refetch } = useQuery(GET_AUTH_USER);
  console.log("AUTH USER", data);

  const theme = useTheme();

  // useEffect(() => {
        document.body.style.backgroundColor = theme.palette.primary.dark
  // }, [document])

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

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        let oldConversations = prev.getAuthUser.conversations;
        let newConversation = subscriptionData.data.newConversation; //a single conversation object

        // if there's already an unseen message from the same user remove it before merging the new message
        let index = oldConversations.findIndex(
          (old) => old.id === newConversation.id
        );
        if (index) {oldConversations.splice(index, 1)}
        const conversations = [newConversation, ...oldConversations];
        let authUser = prev.getAuthUser;
        authUser.conversations = conversations;

        return {
          getAuthUser: authUser,
        };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);



  if (error) {
    return (
      <h3>
        Something went wrong, please bear with us since we're still in
        develoment, we're woring to fix this{" "}
      </h3>
    );
  }


  // if(true){
  //   return <Loading text="Socially v1.0.0" />
  // }

  if(!data && localStorage.getItem("token") || loading){
    return <Loading text={`Socially V1.0.0`} />
  }

  return (
    <Router>
      <Suspense fallback={<Loading />} >
      <Switch>
          {data.getAuthUser ?
            (<Route exact render={() => <AppLayout authUser={data.getAuthUser} />} />) : 
            (<Route exact render={() => <AuthLayout refetch={refetch} />} />)}
      </Switch>
      </Suspense>
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
