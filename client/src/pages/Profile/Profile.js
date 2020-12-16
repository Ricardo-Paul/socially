import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";

const ProfileStyles = makeStyles(theme => ({
    container: {

    },
    info: {
        backgroundColor: "#efefef",
        border: "7px solid #ffffff"
    },
    createPost: {
        marginTop: 20,
        width: "60%"
    }
}))

const Profile = () => {
    const classes = ProfileStyles();

    return(
        <Box className={classes.container}>
            <CoverPhotoUpload />
            <ProfileInfo className={classes.info} />
            <CreatePost className={classes.createPost} />
        </Box>
    )
}

export default Profile;