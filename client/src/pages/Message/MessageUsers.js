import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    container: {
        // backgroundColor: "#cdcde0",
        width: 330,
        height: "90vh",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center"
    }
}))

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
        </Box>
    )
}
 
export default MessageUsers;