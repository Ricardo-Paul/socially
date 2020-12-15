import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const ProfileStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10
    },
    image: {
        width: 200,
        height: 200,
        marginTop: -100,
        borderRadius: "50%",
        border: "7px solid #ffffff"
    },
    info: {
        display: "flex",
        width: 600,
        justifyContent: "space-between"
    }
}))

const ProfileInfo = () => {
    const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
    const classes = ProfileStyles();

    return(
        <Box className={classes.root}>
            <img 
            src={avatar} 
            className={classes.image}
            />
            <Box>
                <h1 style={{textAlign: "center"}} > Alex Xavier </h1>
                <Box className={classes.info}>
                    <Typography> Posts </Typography>
                    <Typography> Following </Typography>
                    <Typography> Followers </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileInfo;