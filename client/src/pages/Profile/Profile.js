import React from "react";
import CreatePost from "../../components/CreatePost";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";
import { Box, makeStyles } from "@material-ui/core";
import { GET_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { useStore } from "../../store";

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

const Profile = ({ match }) => {
  const [{ auth }] = useStore();
  const classes = ProfileStyles();
  const { username } = match.params;

  const isAuthUser = username === auth.user.username;

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading) {
    return <h3> Loading... </h3>;
  }

  return (
    <Box>
      <CoverPhotoUpload user={data.getUser} />
      <ProfileInfo user={data.getUser} className={classes.info} />
      <Box className={classes.content}>
        {isAuthUser && (
          <Box className={classes.postContainer}>
            <CreatePost />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default withRouter(Profile);
