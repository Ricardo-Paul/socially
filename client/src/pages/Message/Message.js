import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import MessageChat from "./MessageChat";
import MessageUsers from "./MessageUsers";

const MessageStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
  },
}));

const Message = () => {
  const classes = MessageStyles();

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <MessageUsers />
        <MessageChat />
      </Box>
    </React.Fragment>
  );
};

export default Message;
