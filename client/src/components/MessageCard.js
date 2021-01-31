import React from "react";
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "./../routes";
import { Avatar, Box, Typography, makeStyles } from "@material-ui/core";
import { useStore } from "../store";
import PropTypes from "prop-types";
import useTheme from "@material-ui/core/styles/useTheme";
import { GET_CONVERSATIONS, UPDATE_MESSAGE_SEEN } from "../graphql/message";
import { useMutation } from "@apollo/client";
import { GET_AUTH_USER } from "../graphql/user";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 330,
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
    backgroundColor: theme.palette.primary.light,
  },
  user: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    textDecoration: "none",
    alignItems: "center",
    padding: 5,
    borderRadius: ".5rem",
    color: "#424242",
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  notSeen: {
    backgroundColor: "#ce2803",
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

const MessageCard = ({ user, notSeen, loading, closeMenu }) => {
  const classes = useStyles();
  const [{ auth }] = useStore();
  const theme = useTheme();
  const text_color = theme.palette.primary.contrastText;

  const unseenMessages = auth.user.conversations; // all user unseen conversations in real time
  let unSeen = unseenMessages.find( m => m.id === user.id); // if we find a particular conversation in the unseen conversations, indicate it as unseen

  const [update] = useMutation(UPDATE_MESSAGE_SEEN, {
    variables: {
      input: {
        sender: user.id,
        receiver: auth.user.id
      }
    },
    refetchQueries:[
      { query: GET_AUTH_USER },
      { query: GET_CONVERSATIONS, variables: {
        authUserId: auth.user.id
      }}
    ]
  });
  
  const updateMessages = async () => {
    // closeMenu();
    try{
      await update();
    }catch(e){
      console.log(e)
    }
  }

  return (
    <NavLink
      className={classes.user}
      activeClassName={classes.selected}
      to={generatePath(Routes.MESSAGE, {
        id: user.id,
      })}
      onClick={updateMessages}
    >
      { loading && <h3> loading ... </h3>  }
      <Avatar style={{ marginRight: 10 }} src={user.image} />
      <Box style={{ width: "100%", color: text_color }}>
        <Box className={classes.info}>
          <span style={{fontWeight:"bold"}} > {user.fullName} </span>
          {unSeen ? <div className={classes.notSeen}></div> : null}
        </Box>
          {user.lastMessage.substring(0, 8)} ...{" "}
      </Box>
    </NavLink>
  );
};

MessageCard.propTypes = {
  user: PropTypes.object.isRequired,
  notSeen: PropTypes.bool,
  closeMenu: PropTypes.func
};

export default MessageCard;
