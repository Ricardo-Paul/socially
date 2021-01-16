import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ChatHeading from "./ChatHeading";
import ChatConversations from "./ChatConversations";
import { useStore } from "../../store";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/user";
import { GET_MESSAGES } from "../../graphql/message";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#dedede",
    width: "100%",
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

  const { data: messagesData, loading: messagesLoading } = useQuery(
    GET_MESSAGES,
    {
      variables: {
        authUserId: auth.user.id,
        userId,
      },
    }
  );

  return (
    <Box className={classes.container}>
      <ChatHeading chatUser={data ? data.getUser : null} />
      <ChatConversations
        messages={messagesData ? messagesData.getMessages : []}
        authUser={auth.user}
        chatUser={data ? data.getUser : null}
      />
    </Box>
  );
};
export default withRouter(MessageChat);
