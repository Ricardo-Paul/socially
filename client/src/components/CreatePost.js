import { Avatar, Box, Button, makeStyles } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { useStore } from "../store";
import { MAX_POST_IMAGE_SIZE } from "../constants/ImageSizeLimit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { CREATE_POST } from "../graphql/post";
import { useMutation } from "@apollo/client";
import UploadPostImage from "./UploadPostImage";
import ImagePreview from "./ImagePreview";

import { colors } from "../utils/theme";
import { GET_AUTH_USER, GET_USER_POSTS } from "../graphql/user";
import { GET_FOLLOWED_POSTS } from "../graphql/post";
import { HOME_PAGE_POSTS_LIMIT, USER_PAGE_POSTS_LIMIT } from "../constants/DataLimit";
import { withRouter } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  container: {
    border: theme.palette.shape.borderColor,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.palette.custom.boxShadow,
    padding: 10,
    [theme.breakpoints.down("sm")]:{
      borderRadius: 0
    }
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
    [theme.breakpoints.down("sm")]:{
      // width: "2.3rem",
      // height: "2.3rem"
    }
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
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      width: "100%",
      height: "3rem",
      paddingLeft: 10,
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
  button_disabled: {
    color: "red",
    backgroundColor: "black"
  },
  upload_button: {
    "& :Mui-disabled": {
      backgroundColor: "red"
    }
  },
  cancel_button: {
    color: theme.palette.primary.contrastText
  },
  uploading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.primary.contrastText
  }
}));

const CreatePost = () => {
  const [isFocused, setIsFocused] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [{ auth }] = useStore();
  const classes = useStyles();
  const showButtons = isFocused || image !="";

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
  const noData = (!loading && !title && !image);
  const handleChange = (e) => setTitle(e.target.value);

  const handleReset = () => {
    setIsFocused(false);
    setTitle("");
    setImage("");
    setUploadError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE)
      setUploadError(`Image is size should not exceed ${MAX_POST_IMAGE_SIZE / 1000000} mb`);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noData) return setUploadError(`You need to upload a photo or tell your followers what's on your mind`);
    setUploading(true);
    try {
       await createPost({
        variables: { input: { title, authorId: auth.user.id, image } },
      });
      setUploading(false)
    } catch (error) {
      console.log(error);
      setUploading(false)
    }
    handleReset();
  };

  return (
    <Fragment>
      <form style={{border: "none"}} onSubmit={(e) => handleSubmit(e, createPost)}>
        <Box className={classes.container}>
          <div className={classes.row1}>
            <div className={classes.avatar}>
              <Avatar src={auth.user.image} />
            </div>

            <input
              type="text"
              multiline="true"
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
          {showButtons && (
            <div className={classes.buttons}>
              <Button
                className={classes.cancel_button}
                size="small"
                onClick={handleReset}
                variant="outlined"
                style={{textTransform: "none"}}
              >
                {!title && !image ? `Close` : `Cancel`}
              </Button>
              <Button
                size="small"
                startIcon={<CloudUploadIcon />}
                variant="contained"
                style={{ marginLeft: 5, textTransform: "none" }}
                type="submit"
                className={classes.upload_button}
                onClick={handleSubmit}
                
              >
                Share
              </Button>
            </div>
          )}
        </Box>
      </form>
      <Box color="red" mt={".3rem"} > {uploadError} </Box>
      { uploading && 
        <Box className={classes.uploading}>
          <LoadingIndicator />
          Uploading...
        </Box>
       }
    </Fragment>
  );
};
export default withRouter(CreatePost);
