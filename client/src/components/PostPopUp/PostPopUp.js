import React, { Fragment } from "react";
import { Button, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ClickAwayListener,
  Avatar,
  IconButton,
  Paper
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import PostPopUpComments from "./PostPopUpComments";

const PostStyles = makeStyles({
  paper: {
    maxHeight: "80%",
    width: 900,
    overflow:"auto",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "30%",
    zIndex: 900,
  },
  card: {
    height: "100%",
  },
  media: {
    height: 500,
    objectFit: "cover",
  },
});

const PostPopUp = ({ closeModal, postImage, comments, author, postTitle, createdAt }) => {
  const src =
    "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512";

  const classes = PostStyles();
  return (
    <ClickAwayListener onClickAway={closeModal}>
      <Paper className={classes.paper}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar>A</Avatar>}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={author}
          subheader={createdAt}
        />
        <CardContent> {postTitle} </CardContent>
        <CardMedia
          className={classes.media}
          image={postImage}
          title={"post picture"}
        />
        <PostPopUpComments comments={comments} />
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
  createdAt: PropTypes.string.isRequired
};
