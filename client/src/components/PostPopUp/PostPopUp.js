import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../utils/theme";
import {
  Card,
  CardHeader,
  CardContent,
  ClickAwayListener,
  Avatar,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PostPopUpComments from "./PostPopUpComments";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";

const PostStyles = makeStyles({ 
  paper: {
    maxHeight: "80%",
    overflow: "auto",
    [theme.breakpoints.up("lg")]: {
      top: "55%",
    },
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    maxWidth: "50%",
    zIndex: 900,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "100%",
    },
  },
  card: {
    height: "100%",
  },
  mediaContainer: {
    height: 400,
    [theme.breakpoints.up("xl")]: {
      height: 600,
    },
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
    width: "95%",
    backgroundColor: "blue",
    margin: "0 auto",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },
});

const PostPopUp = ({
  closeModal,
  postImage,
  comments,
  author,
  postTitle,
  createdAt,
  id
}) => {
  const classes = PostStyles();

  const { data, loading } = useQuery(GET_POST, {
    variables: {
      id
    }
  });

  if(!loading){
    console.log('POST DATA', data)
  }

  // if(loading){
  //   return <h3> loading... </h3>
  // }

  // const post = data && data.getPost;
  // console.log("POST", post);

  return (
    <ClickAwayListener onClickAway={closeModal}>
      <Paper className={classes.paper}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar>A</Avatar>}
            action={
              <IconButton onClick={closeModal}>
                <Close />
              </IconButton>
            }
            title={author}
            subheader={createdAt}
          />
          <CardContent> {postTitle} </CardContent>
          <div className={classes.mediaContainer}>
            <img src={postImage} alt="post image" className={classes.media} />
          </div>
          <PostPopUpComments comments={comments} closeComments={closeModal} />
        </Card>
      </Paper>
    </ClickAwayListener>
  );
};

export default PostPopUp;

PostPopUp.propTypes = {
  closeModal: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  author: PropTypes.string.isRequired,
  postTitle: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};
