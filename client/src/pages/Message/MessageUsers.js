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
    width: 330,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#d0d0d0",
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    width: "90%",
    color: theme.palette.primary.contrastText,
    fontSize: "1rem",
    fontWeight: "bold"
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
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
  user_list: {
    width: "100%",
    padding: ".5rem"
  },
  icon_button: {
    color: theme.palette.primary.contrastText
  }
}));

const MessageUsers = ({ closeMenu }) => {
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


        let uniqueConversations = oldConversations.filter((elem, index) => {
          return oldConversations.findIndex(obj => obj.id === elem.id ) === index;
        })

        console.log('UNIQUE', uniqueConversations)

        // let n;
        // // remove existed user before merging to avoid duplicate
        let unwanted = uniqueConversations.find(n => n.id === newConversation.id);
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
    <Box className={classes.container}>
      <Box className={classes.header}>
        New message
        <IconButton classes={{ root: classes.icon_button }} >
          <CreateIcon sytle={{color: "red"}} />
        </IconButton>
      </Box>
      <Search
        style={{ width: "95%", borderRadius: 0 }}
        messageSearch
        placeholder="Chat users..."
      />
      <Box className={classes.user_list} >
        <List>
          {!loading &&
            data.getConversations.map((user) => {
              // user carries message data
              console.log("SINGLE MESSAGE", user)
              let  notSeen = user.seen === false;
              return <MessageCard user={user} notSeen={notSeen} closeMenu={closeMenu} />;
            })}
        </List>
      </Box>
    </Box>
  );
}; 

export default MessageUsers;

// mrjoe id 5fc2703d329e5d026d4f3020
// me id 5fc26ff2329e5d026d4f301f

// db.messages.updateMany({ receiver: ObjectId("5fc26ff2329e5d026d4f301f"), sender:ObjectId("5fc2703d329e5d026d4f3020") }, { $set: { seen: true } }, { multi: true })