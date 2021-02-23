import React from "react";
import CreatePost from "../../components/CreatePost";
import CoverPhotoUpload from "./CoverPhotoUpload";
import ProfileInfo from "./ProfileInfo";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { GET_USER } from "../../graphql/user";
import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { useStore } from "../../store";
import ProfilePosts from "./ProfilePosts";
import LoadingIndicator from "../../components/LoadingIndicator";
 
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
    width: "100%",
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
    return(
      <Grid container>
        <Grid item md={6} xs={12}>
          <Box display="flex" justifyContent="center" > <LoadingIndicator /> </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item md="8" lg="7" xs="12">
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
          <ProfilePosts username={username} />
      </Box>
      </Grid>
    </Grid>
  );
};

export default withRouter(Profile);
