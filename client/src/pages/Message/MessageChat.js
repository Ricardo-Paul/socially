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
    width: "100%"
  },
}));

const avatar = "https://material-ui.com/static/images/avatar/3.jpg";

const user = {
  id: 1,
  image: avatar,
  fullName: "Roger Alexander",
  lastMessageSender: true,
  lastMessage: "Hey fine",
  isOnline: true,
};

const dummyMessages = [
  {
    id: 1,
    sender: {
      id: "5fc26ff2329e5d026d4f301f",
      image: avatar,
    },
    message: "Hey boy",
    cratedAt: "23 - 09 - 2020",
  },
  {
    id: 1,
    sender: {
      id: "5fc2703d329e5d026d4f3020",
      image: avatar,
    },
    message: "Hey There",
    cratedAt: "23 - 09 - 2020",
  },
];

const MessageChat = ({ match }) => {
  const classes = useStyles();
  const [{ auth }] = useStore();

  const { id } = match.params;
  let userId = id? id: null

  const {data, loading} = useQuery(GET_USER,{
    variables: { userId },
    skip: !id
  });

  const { data: messagesData, loading: messagesLoading  } = useQuery(GET_MESSAGES, {
    variables: {
      authUserId: auth.user.id,
      userId
    }
  })


  return (
    <Box className={classes.container}>
      <ChatHeading chatUser={data?data.getUser:null} />
      <ChatConversations
        messages={messagesData?messagesData.getMessages:[]}
        authUser={auth.user}
        chatUser={data?data.getUser:null}
      />
    </Box>
  );
};
export default withRouter(MessageChat);
