import React, { Fragment } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
  Avatar,
  makeStyles,
  IconButton,
  ClickAwayListener,
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";
import PropTypes from "prop-types";

import { useStore } from "../../store";

import { DELETE_COMMENT } from "../../graphql/comment";
import { useMutation } from "@apollo/client";

import { GET_AUTH_USER } from "../../graphql/user";
import { GET_FOLLOWED_POSTS } from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";

const commentsStyles = makeStyles({
  paper: {
    maxHeight: 300,
  },
});

const PostPopUpComments = ({ comments, userAvatar, closeComments }) => {
  const [{ auth }] = useStore();

  const [remove] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_AUTH_USER },
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT },
      },
    ],
  });

  const deleteComment = async (commentId) => {
    try {
      await remove({
        variables: {
          input: { commentId },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ClickAwayListener onClickAway={closeComments}>
      <List>
        {comments.reverse().map((c) => (
          <ListItem key={c.id}>
            <ListItemAvatar>
              <Avatar alt="user avatar" src={userAvatar} />
            </ListItemAvatar>
            <ListItemText
              primary={c.author.fullName}
              secondary={
                <Fragment>
                  <Typography component="span" variant="body2">
                    {/* 2 days ago */}
                  </Typography>
                  {c.comment}
                </Fragment>
              }
            />
            <ListItemSecondaryAction>
              {auth.user.id === c.author.id && (
                <IconButton onClick={() => deleteComment(c.id)}>
                  <Delete />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {comments.length > 1 && <Divider variant="inset" component="li" />}
      </List>
    </ClickAwayListener>
  );
};

export default PostPopUpComments;

PostPopUpComments.propTypes = {
  comments: PropTypes.array.isRequired,
  userAvatar: PropTypes.string,
};
