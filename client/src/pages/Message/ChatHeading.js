import React from "react";
import PropTypes from "prop-types";
import { Avatar, Typography, Box, makeStyles } from "@material-ui/core";
import Search from "../../components/Search/Search";

const useStyles = makeStyles((theme) => ({
  user: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    textDecoration: "none",
    alignItems: "center",
    padding: 5,
    color: "#ffffff",
    backgroundColor: "#505050",
  },
  online: {
    backgroundColor: "#1bde03",
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginLeft: 15,
  },
  avatar: {
    marginRight: 15,
    border: "3px solid #a9a4a4",
    borderRadius: "50%",
  },
}));

const ChatHeading = ({ chatUser }) => {
  const classes = useStyles();

  if (chatUser) {
    return (
      <Box className={classes.user}>
        <Avatar className={classes.avatar} src={chatUser.image} />
        <Typography> {chatUser.fullName} </Typography>
        {chatUser.isOnline && <div className={classes.online} />}
      </Box>
    );
  }

  if (!chatUser) {
    return <Box></Box>;
  }
};

ChatHeading.propTypes = {
  chatUser: PropTypes.object,
};

export default ChatHeading;
