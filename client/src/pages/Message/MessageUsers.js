import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Search from "../../components/Search/Search";
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "../../routes";
import {
  GET_CONVERSATIONS,
  GET_NEW_CONVERSATIONS,
} from "../../graphql/message";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import MessageCard from "../../components/MessageCard";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "#cdcde0",
    width: 330,
    // height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#d0d0d0",
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    width: "90%",
  },
  selected: {
    backgroundColor: "#ceced0",
  },
  user: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    textDecoration: "none",
    alignItems: "center",
    padding: 5,
    color: "#424242",
  },
  notSeen: {
    backgroundColor: "#4f60da",
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginLeft: 15,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));

const MessageUsers = () => {
  const classes = useStyles();
  const [{ auth }] = useStore();

  const { data, loading, subscribeToMore } = useQuery(GET_CONVERSATIONS, {
    variables: {
      authUserId: auth.user.id,
    },
  });

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newConversation } = subscriptionData.data;
        const oldConversations = prev.getConversations;

        const existedUserInChat = oldConversations.some(
          (u) => u.id === newConversation.id
        );
        if (existedUserInChat) return prev;
        // newConversation.id is the senderUser id

        let mergedConversations = [...oldConversations, newConversation];
        return {
          getConversations: mergedConversations,
        };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  return (
    <Box border={1} className={classes.container}>
      <Box className={classes.header}>
        <Typography> CHATS </Typography>
        <IconButton>
          <CreateIcon />
        </IconButton>
      </Box>
      <Search
        style={{ width: "95%", borderRadius: 0 }}
        messageSearch
        placeholder="Chat users..."
      />
      <Box width="100%">
        <List>
          {!loading &&
            data.getConversations.map((user) => {
              const notSeen =
                user.seen === false && user.lastMessageSender === false;
              console.log("NOT SEEN", notSeen);

              console.log("CONVERSATIONS", data.getConversations);
              return (
                <MessageCard user={user} unseen={notSeen} />
              );
            })}
        </List>
      </Box>
    </Box>
  );
};

export default MessageUsers;
