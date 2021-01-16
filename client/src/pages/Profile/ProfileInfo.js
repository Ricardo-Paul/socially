import React from "react";
import { Box, Button, IconButton, makeStyles, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { GET_AUTH_USER, UPLOAD_USER_PHOTO } from "../../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../../store";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";
import PropTypes from "prop-types"
import Follow from "../../components/Follow";
import { Link, generatePath } from "react-router-dom";
import * as Routes from "../../routes";
import MessageIcon from "@material-ui/icons/Message";

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
  connect: {
    display: "flex"
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

  const isAuthUser = user.username === auth.user.username

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
        { isAuthUser && <IconButton className={classes.uploadIcon} onClick={handleIconClick}>
          <PhotoCamera />
        </IconButton> }
      </Box>
      <Box>
        <h1 style={{ textAlign: "center" }}> {user.fullName} </h1>
        <Box className={classes.info}>
          <Typography variant="subtitle2" color="textSecondary">
            {" "}
            {user.posts.length} Posts{" "}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {" "}
            {user.following.length} Following{" "}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {" "}
            {user.followers.length} Followers{" "}
          </Typography>
        </Box>
      </Box>

    {!isAuthUser && <Box className={classes.connect}>
        <Follow user={user} />
        <Button style={{marginLeft: '5px', color:"#ffffff", backgroundColor: "#1577f1"}} variant="contained" size="small" component={Link} to={generatePath(Routes.MESSAGE, {
          id: user.id
        })} >
         <MessageIcon fontSize="small" />
        </Button>
      </Box>}
    </Box>
  );
};

ProfileInfo.prototype = {
  user: PropTypes.object.isRequired
}

export default ProfileInfo;
