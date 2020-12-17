import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";

const ProfileStyles = makeStyles((theme) => ({
  info: {
    backgroundColor: "#efefef",
    border: "7px solid #ffffff",
  },
  content: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  postContainer: {
    marginTop: 20,
    width: "80%",
  }
}));

const Profile = () => {
  const classes = ProfileStyles();

  return (
    <Box>
      <CoverPhotoUpload />
      <ProfileInfo className={classes.info} />
      <Box className={classes.content}>
        <Box className={classes.postContainer}>
          <CreatePost />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
