import React from "react";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { GET_AUTH_USER, UPLOAD_USER_PHOTO } from "../../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../../store";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";
import PropTypes from "prop-types";
import Follow from "../../components/Follow";
import { Link, generatePath } from "react-router-dom";
import * as Routes from "../../routes";

const ProfileStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginTop: -147,
    borderRadius: "50%",
    border: "3px solid #3c3c3c",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    // backgroundColor: "#ececec",
    // border: "1px solid #d0d0d0",
    marginBottom: 10,
    padding: 15,
    color: theme.palette.primary.contrastText
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
  connect: {
    display: "flex",
  },
  fullName: {
    color: theme.palette.primary.contrastText
  }
}));

const ProfileInfo = ({ user }) => {
  const classes = ProfileStyles();
  const inputRef = React.useRef(null);
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
        refetchQueries: [{ query: GET_AUTH_USER }],
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const isAuthUser = user.username === auth.user.username;

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <img src={user.image || defaultAvatar} className={classes.image} />
        <input
          accept="image/x-png,image/jpeg"
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isAuthUser && (
          <IconButton className={classes.uploadIcon} onClick={handleIconClick}>
            <PhotoCamera />
          </IconButton>
        )}
      </Box>
      <Box style={{ width: "100%" }} >
        <h1 className={classes.fullName} style={{ textAlign: "center", fontSize: "2rem" }}> {user.fullName} </h1>
        <Box className={classes.info}>
          <Typography variant="subtitle2">
            {" "}
            {user.posts.length} Posts{" "}
          </Typography>
          <Typography variant="subtitle2">
            {" "}
            {user.following.length} Following{" "}
          </Typography>
          <Typography variant="subtitle2">
            {" "}
            {user.followers.length} Followers{" "}
          </Typography>
        </Box>
      </Box>

      {!isAuthUser && (
        <Box className={classes.connect}>
          <Follow user={user} />
          <Button
            style={{
              marginLeft: "5px",
              color: "#ffffff",
              backgroundColor: "#1577f1",
            }}
            fullWidth
            variant="contained"
            component={Link}
            // size="small"
            to={generatePath(Routes.MESSAGE, {
              id: user.id,
            })}
          >
            Message
          </Button>
        </Box>
      )}
    </Box>
  );
};

ProfileInfo.prototype = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfo;
