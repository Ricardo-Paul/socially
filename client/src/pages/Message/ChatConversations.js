import React from "react";
import { Box, makeStyles, Button, InputBase, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE, GET_MESSAGES, GET_CONVERSATIONS } from "../../graphql/message";
import { generatePath, Link } from "react-router-dom";
import * as Routes from "../../routes";
import { GET_AUTH_USER } from "../../graphql/user";

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
    maxHeight: "calc(80vh - 77px)",
    overflow: "auto",
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
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: ({ data }) => {
      if(data && data.createMessage.message){
        alert("WILL REFETCH")
        return [
          { query: GET_CONVERSATIONS, variables: { authUserId: authUser.id } },
          { query: GET_AUTH_USER }
        ]
      }
    }
  });
  const [message, setMessage] = React.useState("");


  if (!chatUser) {
    return <h3> error </h3>;
  }

  const sendMessage = async () => {
    if (!message || message.trim() === "") {
      return;
    }

    try{
      const r = await createMessage({
        variables: {
          input: {
            sender: authUser.id,
            receiver: chatUser.id,
            message,
          },
        }
      });
      console.log('CREATE MESSAGE :', r)
    } catch(e){
      console.log(e)
    }

    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };


  return (
    <Box className={classes.container}>
      <Box className={classes.conversation}>
        {messages.map((message) => {
          const isAuthUserSender = authUser.id === message.sender;

          return (
            <Box
              style={isAuthUserSender ? { justifyContent: "flex-end" } : null}
              className={`${classes.messageWrapper}`}
            >
              {!isAuthUserSender && (
                <Avatar
                  component={Link}
                  to={generatePath(Routes.PROFILE, {
                    username: chatUser && chatUser.username,
                  })}
                  style={{ marginRight: 5 }}
                  src={chatUser ? chatUser.image : null}
                />
              )}
              <Box
                style={
                  isAuthUserSender
                    ? { backgroundColor: "#29292b", color: "#eaeaea" }
                    : null
                }
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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={message}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            disabled={message ? false : true}
            onClick={sendMessage}
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
