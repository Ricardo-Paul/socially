import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import Search from "../../components/Search/Search";

const useStyles = makeStyles(theme => ({
    container: {
        // backgroundColor: "#cdcde0",
        width: 330,
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center",
        width: "90%"
    }
}))

const dummyUsers = [
    {
        id: 1,
        image: '',
        fullName: "Roger Alexander",
        lastMessageSender: true,
        lastMessage: "Hey fine"
    },
    {
        id: 2,
        image: '',
        fullName: "Alex Xavier",
        lastMessageSender: false,
        lastMessage: "For the love of Open Source"
    },
    {
        id: 3,
        image: '',
        fullName: "Sam Saul",
        lastMessageSender: true,
        lastMessage: "Print Eval Loop"
    }
]

const MessageUsers = () => {
    const classes = useStyles();

    return(
        <Box border={1} className={classes.container}>
            <Box className={classes.header}>
                <Typography> CHATS </Typography>
                <IconButton>
                    <CreateIcon />
                </IconButton>
            </Box>
            <Search style={{width: "90%"}} messageSearch placeholder="Chat users..."  />
            <Box>
                
            </Box>
        </Box>
    )
}
 
export default MessageUsers;