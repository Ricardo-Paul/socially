import React from "react";
import { ThumbUpAlt } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useStore } from "./../store";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { HOME_PAGE_POSTS_LIMIT } from "./../constants/DataLimit";
import { CREATE_LIKE, DELETE_LIKE } from "./../graphql/like";
import { GET_FOLLOWED_POSTS, GET_POST } from "./../graphql/post";
import { GET_AUTH_USER, GET_USER_POSTS } from "../graphql/user";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Button from "@material-ui/core/Button"
import useTheme from "@material-ui/core/styles/useTheme";
import { Hidden } from "@material-ui/core";


const Like = ({ likes, postId, author, like_style }) => {
  const theme = useTheme();
  const inner_color = {color: theme.palette.primary.contrastText}
  const [{ auth }] = useStore();
  const existedLike = likes.find((like) => like.user.id === auth.user.id);
  // decide what operation to execute based on whether the current user has liked the post
  const operation = existedLike ? "delete" : "create";


  const options = {
    create: {
      mutation: CREATE_LIKE,
      variables: { postId, userId: auth.user.id, authorId: author.id }, //notice variables value is an object
    },
    delete: {
      mutation: DELETE_LIKE,
      variables: { likeId: existedLike ? existedLike.id : null },
    },
  };

  const [mutate] = useMutation(options[operation].mutation, {
    // TODO: also refetch the user posts
    refetchQueries: [
      { query: GET_AUTH_USER },
      {
        query: GET_USER_POSTS,
        variables: { username: author.username }
      },
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT },
      },
    ],
  });

  const handleButtonClick = async () => {
    try {
      await mutate({
        variables: { input: { ...options[operation].variables } }, // spread the variables object
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Button onClick={() => handleButtonClick(mutate)} 
      className={like_style} 
      style={inner_color}>
        <ThumbUpAltOutlinedIcon style={{ marginRight: "0.5rem", 
        color: existedLike ? "#0b80ef" : "#d4d4d4" }} />
        <Hidden xsDown>Like</Hidden>
      </Button>
  );
};

export default Like;

Like.propTypes = {
  likes: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  author: PropTypes.object,
};

// db.users.update({username:'mrjoe'}, {$set: {likes: []}})
{/* <IconButton onClick={() => handleButtonClick(mutate)}>
<ThumbUpAlt style={{ color: existedLike ? "#0b80ef" : "#d4d4d4" }} />
</IconButton> */}