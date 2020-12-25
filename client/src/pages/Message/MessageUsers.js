import React from "react";
import { Avatar, Box, IconButton, List, makeStyles, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import Search from "../../components/Search/Search";
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "../../routes";
import { GET_CONVERSATIONS } from "../../graphql/message";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";

const useStyles = makeStyles(theme => ({
    container: {
        // backgroundColor: "#cdcde0",
        width: 330,
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderColor: "#d0d0d0",
        backgroundColor: "#ffffff"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center",
        width: "90%"
    },
    selected: {
        backgroundColor: "#ceced0"
    },
    user: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        textDecoration: "none",
        alignItems: "center",
        padding: 5,
        color: "#424242"
    }
}))

const MessageUsers = () => {
    const classes = useStyles();
    const [{ auth }] = useStore();

    const { data, loading } = useQuery(GET_CONVERSATIONS, {
        variables:{
            authUserId: auth.user.id
        }
    });

    return(
        <Box border={1} className={classes.container}>
            <Box className={classes.header}>
                <Typography> CHATS </Typography>
                <IconButton>
                    <CreateIcon />
                </IconButton>
            </Box>
            <Search style={{width: "95%", borderRadius: 0}} messageSearch placeholder="Chat users..."  />
            <Box width="100%">
                <List>
                {!loading && data.getConversations.map(user => (
                    <NavLink className={classes.user} activeClassName={classes.selected} to={
                        generatePath(Routes.MESSAGE,{
                            id: user.id
                        })
                    }>
                        <Avatar style={{marginRight: 10}} src={user.image} />
                        <Typography> {user.fullName }</Typography>
                    </NavLink>
                ))}
                </List>
            </Box>
        </Box>
    )
}
 
export default MessageUsers;