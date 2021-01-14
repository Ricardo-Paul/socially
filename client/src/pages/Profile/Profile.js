
import React from "react";
import CreatePost from "../../components/CreatePost";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";
import { Box, makeStyles } from "@material-ui/core";
import { GET_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";

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
  },
}));

const Profile = () => {
  const classes = ProfileStyles();
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username:'mrjoe'
    }
  });

  if(loading){
    return (
      <h3> Loading... </h3>
    )
  }

  if(!loading){
    console.log('SINGLE USER', data)
  }

  const u = {
    fullName: "ANY",
    image: "pichere",
    posts:[],
    followers:[],
    following:[]
  }

  return (
    <Box>
      <CoverPhotoUpload />
      <ProfileInfo user={data.getUser} className={classes.info} />
      <Box className={classes.content}>
        <Box className={classes.postContainer}>
          <CreatePost />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
