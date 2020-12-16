import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

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
    },
    imgContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    uploadIcon: {
        backgroundColor: "#2896e4",
        position: "absolute",
        color: "#fbfbfb",
        right: 0,
        bottom: 0
    }
}))

const ProfileInfo = () => {
    const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
    const classes = ProfileStyles();

    return(
        <Box className={classes.root}>
            <Box className={classes.imgContainer}>
                <img 
                src={avatar} 
                className={classes.image}
                />
                <IconButton 
                className={classes.uploadIcon}
                
                >
                    <PhotoCamera />
                </IconButton>
            </Box>
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