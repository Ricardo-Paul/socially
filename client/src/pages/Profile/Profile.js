import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";

const ProfileStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#efefef",
        border: "7px solid #ffffff"
    }
}))

const Profile = () => {
    const classes = ProfileStyles();

    return(
        <Box className={classes.container}>
            <CoverPhotoUpload />
            <ProfileInfo />
        </Box>
    )
}

export default Profile;