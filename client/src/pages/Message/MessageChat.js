import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import ChatHeading from "./ChatHeading";
import ChatConversations from "./ChatConversations";
import { useStore } from "../../store";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#dedede",
    width: "100%",
    // height:"90vh",
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
  const { id: userId } = match.params;

  const classes = useStyles();
  const [{ auth }] = useStore();

  return (
    <Box className={classes.container}>
      <ChatHeading chatUser={user} />
      <ChatConversations
        messages={dummyMessages}
        authUser={auth.user}
        chatUser={user}
      />
    </Box>
  );
};
export default withRouter(MessageChat);
