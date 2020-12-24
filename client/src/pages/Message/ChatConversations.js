import React from "react";
import { Box, makeStyles, Button, InputBase } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#dedede",
        width: "100%",
        height: 'calc(100% - 50px)',
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
        borderRight: "1px solid #bfbebe"
    }
}));


const ChatConversations = ({ chatUser, messages }) => {
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            <Box className={classes.conversation}>
                {messages.map(message => {

                    return(
                        <Box className={classes.messageWrapper}>
                            { message.message }
                        </Box>
                    )
                })}
            </Box>

            {chatUser && 
                <Box className={classes.submit}>
                    <InputBase 
                    type="text" 
                    style={{width: 'calc(100% - 50px)'}}
                    placeholder="Start typing your message..."
                    />
                    <Button type="submit" variant="contained" size="small" color="primary">
                        Send 
                    </Button>
                </Box>
            }
        </Box>
    )
};

ChatConversations.propTypes = {
    chatUser: PropTypes.object,
    messages: PropTypes.array.isRequired
}
 
export default ChatConversations;