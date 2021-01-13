import React from "react"
import { GET_USER_NOTIFICATIONS } from "../../graphql/notification"
import { useQuery } from "@apollo/client"
import { useStore } from "../../store"

const Notifications = () => {
    const [{auth}] = useStore();

    // TODO: rep skip and limit with constant VARS
    // USE FetchMore
    const { data, loading, error, networkStatus } = useQuery(GET_USER_NOTIFICATIONS, {
        variables: {
            userId: auth.user.id,
            skip: 0,
            limit: 10
        },
        notifyOnNetworkStatusChange: true
    })
    

    const renderContent = () => {
        if (loading && networkStatus === 1) {
            return <h4> loading ... </h4>;
          }
      
          if (loading && networkStatus === 3) {
            return <h4> Loading more... </h4>;
          }
      
          console.log(data);
          if (error) {
            console.log(error);
          }
      
          if (!loading && networkStatus != 1) {
            const notifications = data.getUserNotifications.notifications;
            console.log("NOTIFICATIONS", data.getUserNotifications);
      
            notifications.map((p) => {
              console.log("AUTHOR: ", p.author);
              console.log("COMMENTS", p.comments);
            });
      
            if (!notifications.length) {
              return <h5> NO NOTIFICATIONS </h5>;
            }
    }
}

    return(
        <h3> {renderContent()} </h3>
    )
}

export default Notifications;