import { Avatar, Box, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useStore } from "../store";
import { MAX_POST_IMAGE_SIZE } from "../constants/ImageSizeLimit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// mutation
import { CREATE_POST } from "../graphql/post";
import { useMutation } from "@apollo/client";
import UploadPostImage from "./UploadPostImage";
import ImagePreview from "./ImagePreview";

import { colors, shadows } from "../utils/theme";
import { GET_AUTH_USER, GET_USER_POSTS } from "../graphql/user";
import { GET_FOLLOWED_POSTS } from "../graphql/post";
import { HOME_PAGE_POSTS_LIMIT, USER_PAGE_POSTS_LIMIT } from "../constants/DataLimit";
import { withRouter } from "react-router-dom";

const postStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  row1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    padding: 5,
    color: colors.lighRed,
  },
  textarea: {
    marginLeft: 10,
    marginRight: 10,
    width: "100%",
    borderRadius: theme.palette.shape.inputBorderRadius,
    border: "none",
    height: "3rem",
    lineHeight: "1.5rem",
    fontSize: "1.1rem",
    fontFamily: "roboto",
    // height: 50,
    outline: "none",
    paddingLeft: 15,
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      width: "100%",
      height: 50,
      paddingLeft: 5,
    },
  },
  uploadIcon: {
    padding: 5,
    color: "white",
  },
  buttons: {
    borderTop: "0.11rem solid #424242",
    paddingTop: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      margin: 2,
    },
  },
}));

const CreatePost = ({ match }) => {

  const [isFocused, setIsFocused] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [{ auth }] = useStore();
  const classes = postStyles();

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [
      { query: GET_AUTH_USER },
      {
        query: GET_USER_POSTS,
        variables: { username: auth.user.username, limit: USER_PAGE_POSTS_LIMIT }
      },
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT },
      },
    ],
  });
  const isUploadDisabled = loading || (!loading && !title && !image);

  // title change
  const handleChange = (e) => setTitle(e.target.value);

  const handleReset = () => {
    setIsFocused(false);
    setTitle("");
    setImage("");
  };

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      setUploadError(
        `Image is size should not exceed ${MAX_POST_IMAGE_SIZE / 1000000} mb`
      );
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    if (!title && !image) {
      return;
    }
    e.preventDefault();
    try {
      const res = await createPost({
        variables: { input: { title, authorId: auth.user.id, image } },
      });
    } catch (error) {
      console.log(error);
    }
    handleReset();
  };

  return (
    <>
      <form style={{border: "none"}} onSubmit={(e) => handleSubmit(e, createPost)}>
        <Box className={classes.container}>
          <div className={classes.row1}>
            <div className={classes.avatar}>
              {/* <AccountCircle fontSize="large" /> */}
              <Avatar src={auth.user.image} />
            </div>

            <input
              type="text"
              className={classes.textarea}
              placeholder="What's on your mind..."
              value={title}
              onChange={handleChange}
              focused={isFocused}
              onFocus={() => setIsFocused(true)}
            />

            <div className={classes.uploadIcon}>
              <UploadPostImage handleImageChange={handleImageChange} />
            </div>
          </div>

          {image && <ImagePreview imageSource={URL.createObjectURL(image)} />}
          {uploadError}
          {isFocused && (
            <div className={classes.buttons}>
              <Button
                color="secondary"
                size="small"
                onClick={handleReset}
                variant="outlined"
              >
                {!title && !image ? `CLOSE` : `CANCEL`}
              </Button>
              <Button
                color="secondary"
                size="small"
                startIcon={<CloudUploadIcon />}
                variant="contained"
                style={{ marginLeft: 5 }}
                type="submit"
                disabled={isUploadDisabled}
              >
                SHARE
              </Button>
            </div>
          )}
        </Box>
      </form>
    </>
  );
};
export default withRouter(CreatePost);
