import React from "react";
import PropTypes from "prop-types";
import { Avatar, Typography, Box, makeStyles } from "@material-ui/core";
import Search from "../../components/Search/Search";

const useStyles = makeStyles(theme => ({
    user: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        textDecoration: "none",
        alignItems: "center",
        padding: 5,
        color: "#ffffff",
        backgroundColor: "#ababab"
    }
}))

const ChatHeading = ({ chatUser }) => {
    const classes = useStyles();

    if(chatUser){
        return(
            <Box className={classes.user}>
                <Avatar style={{marginRight: 15}} src={chatUser.image} />
                <Typography> { chatUser.fullName } </Typography>
            </Box>
        )
    };

    if(!chatUser){
        return(
            <Box>
                <Search fullWidth style={{borderRadius: 0, width: "100%"}} />
            </Box>
        )
    }
}

ChatHeading.propTypes = {
    chatUser: PropTypes.object
}

export default ChatHeading;