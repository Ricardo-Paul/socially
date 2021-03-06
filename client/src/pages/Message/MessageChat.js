import React, { useEffect } from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
import ChatHeading from "./ChatHeading";
import ChatConversations from "./ChatConversations";
import { useStore } from "../../store";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/user";
import { GET_MESSAGES, GET_NEW_MESSAGE } from "../../graphql/message";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    position: "relative"
  },
}));

const avatar = "https://material-ui.com/static/images/avatar/3.jpg";

const MessageChat = ({ match }) => {
  const classes = useStyles();
  const [{ auth }] = useStore();

  const { id } = match.params;
  let userId = id ? id : null;

  const { data, loading } = useQuery(GET_USER, {
    variables: { userId },
    skip: !id,
  });

  const { data: messagesData, loading: messagesLoading, subscribeToMore } = useQuery(
    GET_MESSAGES,
    {
      variables: {
        authUserId: auth.user.id,
        userId,
      },
    }
  );


  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_MESSAGE,
      variables: {
        authUserId: auth.user.id,
        userId: userId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData) return prev;
        if(!prev.getMessages) return;

        console.log('PREV MESSAGES', prev)

        const newMessage = subscriptionData.data.messageCreated;
        const mergedMessages = [...prev.getMessages, newMessage];

        console.log('MESSAGE DATA', subscriptionData, "MESSAGE", newMessage);
        
        return {
          getMessages: mergedMessages
        }
      }
    });

    return () => {
      unsubscribe();
    }
  }, [ subscribeToMore, userId ])

  return (
      <Fragment>
        <div className={classes.container}>
          <ChatHeading chatUser={data ? data.getUser : null} />
          <ChatConversations
            messages={messagesData ? messagesData.getMessages : []}
            authUser={auth.user}
            chatUser={data ? data.getUser : null}
          />
        </div>
      </Fragment>
  );
};
export default withRouter(MessageChat);
