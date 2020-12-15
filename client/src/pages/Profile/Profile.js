import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import CoverPhotoUpload from "./CoverPhotoUpload";

const ProfileStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "grey"
    }
}))

const Profile = () => {
    const classes = ProfileStyles();

    return(
        <Box className={classes.container}>
            <CoverPhotoUpload />
        </Box>
    )
}

export default Profile;