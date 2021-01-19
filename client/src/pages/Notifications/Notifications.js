import React from "react";
import { GET_USER_NOTIFICATIONS } from "../../graphql/notification";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import Notification from "../../components/App/Notification";
import { Typography } from "@material-ui/core";

const Notifications = () => {
  const [{ auth }] = useStore();

  // TODO: rep skip and limit with constant VARS
  // USE FetchMore
  const { data, loading, networkStatus } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: {
      userId: auth.user.id,
      skip: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const count = data ? data.getUserNotifications.count : null;

  const renderContent = () => {
    if (loading && networkStatus === 1) {
      return <h4> loading ... </h4>;
    }

    if (loading && networkStatus === 3) {
      return <h4> Loading more... </h4>;
    }

    if (!loading && networkStatus != 1) {
      const notifications = data.getUserNotifications.notifications;

      if (!notifications.length) {
        return <h5> NO NOTIFICATIONS </h5>;
      }

      return notifications.map((n) => (
        <Notification key={n.id} notification={n} />
      ));
    }
  };

  return (
    <React.Fragment>
      {renderContent()}
    </React.Fragment>
  );
};

export default Notifications;
