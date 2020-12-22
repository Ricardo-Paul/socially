import React from "react";
import { Avatar, Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import Search from "../../components/Search/Search";
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "../../routes";


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
    },
    selected: {
        backgroundColor: "blue"
    },
    user: {
        display: "flex",
        width: "100%",
    }
}))
const avatar = "https://material-ui.com/static/images/avatar/3.jpg"
const dummyUsers = [
    {
        id: 1,
        image: avatar,
        fullName: "Roger Alexander",
        lastMessageSender: true,
        lastMessage: "Hey fine"
    },
    {
        id: 2,
        image: avatar,
        fullName: "Alex Xavier",
        lastMessageSender: false,
        lastMessage: "For the love of Open Source"
    },
    {
        id: 3,
        image: avatar,
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
                {dummyUsers.map(user => (
                    <NavLink className={classes.user} activeClassName={classes.selected} to={
                        generatePath(Routes.MESSAGE,{
                            id: user.id
                        })
                    }>
                        <Avatar src={user.image} />
                        <Typography> {user.fullName }</Typography>
                    </NavLink>
                ))}
            </Box>
        </Box>
    )
}
 
export default MessageUsers;