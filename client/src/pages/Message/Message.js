import React from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
import MessageChat from "./MessageChat";
import MessageUsers from "./MessageUsers";

const MessageStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "85vh",
  },
}));

const Message = () => {
  const classes = MessageStyles();

  return (
    <React.Fragment>
   <Grid container>
    <Grid item md="8" lg="7" xs="12">
      <Box className={classes.container}>
        <MessageUsers />
        <MessageChat />
      </Box>
      </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Message;
