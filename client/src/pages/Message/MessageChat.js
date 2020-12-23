import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import ChatHeading from "./ChatHeading";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#dedede",
        width: "100%",
        height:"90vh",
    }
}));

const avatar = "https://material-ui.com/static/images/avatar/3.jpg"

const user = {
    id: 1,
    image: avatar,
    fullName: "Roger Alexander",
    lastMessageSender: true,
    lastMessage: "Hey fine",
    isOnline: true
}

const MessageChat = () => {
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            <ChatHeading chatUser={user} />
        </Box>
    )
}
 
export default MessageChat;