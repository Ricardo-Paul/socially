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



  // const notSeen = user.seen === false && user.lastMessageSender === false;
  // let notSeen;

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newConversation } = subscriptionData.data;
        const oldConversations = prev.getConversations;

        console.log('VERY NEW CONV', newConversation);

        // let n;
        // // remove existed user before merging to avoid duplicate



     
        let mergedConversations = [...oldConversations, newConversation];

        let unwanted = oldConversations.find(n => n.id === newConversation.id);
        let r = oldConversations.filter(n => n.id !== unwanted.id )
        console.log('NID', unwanted)
        console.log('FINISHED', r)


        return {
          getConversations: [newConversation, ...r]
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
              console.log('USER MESSAGE', user);

              let  notSeen = user.seen === false && user.id !== auth.user.id;

              console.log("NOT SEEN", notSeen);

              console.log("CONVERSATIONS", data.getConversations);
              return <MessageCard user={user} notSeen={notSeen} />;
            })}
        </List>
      </Box>
    </Box>
  );
}; 

export default MessageUsers;
