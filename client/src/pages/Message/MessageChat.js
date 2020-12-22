import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#d6d6d6",
        width: "100%",
        height:"90vh"
    }
}))

const MessageChat = () => {
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            MESSAGE CHAT
        </Box>
    )
}
 
export default MessageChat;