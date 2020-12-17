import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { GET_AUTH_USER, UPLOAD_USER_PHOTO } from "../../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../../store";

const ProfileStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -100,
    borderRadius: "50%",
    border: "7px solid #ffffff",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    width: 600,
    justifyContent: "space-between",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  uploadIcon: {
    backgroundColor: "#2896e4",
    position: "absolute",
    color: "#fbfbfb",
    right: 0,
    bottom: 0,
  },
}));

const ProfileInfo = () => {
  const classes = ProfileStyles();
  const inputRef = React.useRef(null);
  const [image, setImage] = React.useState("");
  const client = useApolloClient();
  const [{ auth }] = useStore();

  const handleIconClick = () => inputRef.current.click();

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    try {
      const { data } = await client.mutate({
        mutation: UPLOAD_USER_PHOTO,
        variables: {
          input: {
            userId: auth.user.id,
            image: image,
            isCover: false,
            imagePublicId: "userphoto",
          },
        },
        refetchQueries:[
            {query: GET_AUTH_USER}
        ]
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <img src={auth.user.image} className={classes.image} />
        <input
          accept="image/x-png,image/jpeg"
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <IconButton className={classes.uploadIcon} onClick={handleIconClick}>
          <PhotoCamera />
        </IconButton>
      </Box>
      <Box>
        <h1 style={{ textAlign: "center" }}> {auth.user.fullName} </h1>
        <Box className={classes.info}>
          <Typography variant="caption"> {auth.user.posts.length} Posts </Typography>
          <Typography variant="subtitle1"> {auth.user.following.length} Following </Typography>
          <Typography variant="subtitle2" color="textSecondary"> {auth.user.followers.length} Followers </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
