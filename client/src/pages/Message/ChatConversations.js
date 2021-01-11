import React from "react";
import { Box, makeStyles, Button, InputBase, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#dedede",
    width: "100%",
    height: "calc(100% - 50px)",
    position: "relative",
  },
  submit: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    padding: 5,
    backgroundColor: "#f7f7f7",
    borderTop: "1px solid #bfbebe",
    borderBottom: "1px solid #bfbebe",
    borderRight: "1px solid #bfbebe",
  },
  conversation: {
    flexGrow: 1,
  },
  messageWrapper: {
    padding: 10,
    margin: "5px 5px 0 5px",
    display: "flex",
  },
  message: {
    maxWidth: 300,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
  },
}));

const ChatConversations = ({ chatUser, messages, authUser }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.conversation}>
        {messages.map((message) => {
          const isAuthUserSender = authUser.id === message.sender.id;

          return (
            <Box
              style={isAuthUserSender ? { justifyContent: "flex-end" } : null}
              className={`${classes.messageWrapper}`}
            >
              {!isAuthUserSender && (
                <Avatar style={{ marginRight: 5 }} src={null} />
              )}
              <Box
                style={isAuthUserSender ? { backgroundColor: "#bfbfbf" } : null}
                className={classes.message}
              >
                {" "}
                {message.message}{" "}
              </Box>
            </Box>
          );
        })}
      </Box>

      {chatUser && (
        <Box className={classes.submit}>
          <InputBase
            type="text"
            style={{ width: "calc(100% - 50px)" }}
            placeholder="Start typing your message..."
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

ChatConversations.propTypes = {
  chatUser: PropTypes.object,
  messages: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default ChatConversations;
