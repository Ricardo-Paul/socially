import React from "react";
import PropTypes from "prop-types";
import { makeStyles, IconButton, Avatar } from "@material-ui/core";
import { CREATE_COMMENT } from "../graphql/comment";
import { useMutation } from "@apollo/client";
import { useStore } from "../store";
import { Send } from "@material-ui/icons";
import Box from "@material-ui/core/Box";

import { GET_AUTH_USER, GET_USER_POSTS } from "../graphql/user";
import { GET_FOLLOWED_POSTS, GET_POST } from "../graphql/post";
import { HOME_PAGE_POSTS_LIMIT, USER_PAGE_POSTS_LIMIT } from "../constants/DataLimit";

const commenStyles = makeStyles(theme => ({
  textField: {
    marginRight: 5,
    padding: 13,
    paddingLeft: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
    },
    backgroundColor: theme.palette.primary.light,
    borderRadius: 20,
    outline: "none",
    border: "none",
    width: "90%",
    color: theme.palette.primary.contrastText,
    '&::placeholder': {
      color: theme.palette.primary.contrastText
    },
    fontSize: "1rem"
  },
  form: {
    display: "flex",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    paddingLeft: "0.5rem"
  },
  avatar: {
    position: "relative",
    marginRight: 10
  },
  oneline_indicator: {
    width: 10,
    height: 10,
    backgroundColor: "#00ff00", //greencolor 
    position: "absolute",
    right: "-3px",
    bottom: "4px",
    borderRadius: "50%"
  }
}));

const CreateComment = ({ focus, postId }) => {
  const classes = commenStyles();
  const textareaEl = React.useRef(null);
  const buttonEl = React.useRef(null);

  const [comment, setComment] = React.useState("");
  const [{ auth }] = useStore();
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_AUTH_USER },
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT },
      },
      // {
      //   query: GET_USER_POSTS,
      //   variables: {
      //     username: auth.user.username,
      //     limit: USER_PAGE_POSTS_LIMIT
      //   }
      // },
      { 
        query: GET_POST,
        variables: {
          id: postId
        }
      }
    ],
  });

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({
        variables: { input: { comment, authorId: auth.user.id, postId } },
      });
    } catch (err) {
      console.log(err);
    }
    setComment("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      buttonEl.current.click();
      setComment("");
    }
  };

  // focus is a boolean.. we'll focus on the
  // text area when comment is open
  // React.useEffect(() => {
  //   focus && input.current.focus();
  // }, [focus]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Box className={classes.avatar}>
          <Avatar src={auth.user.image} />
          <Box className={classes.oneline_indicator} ></Box>
        </Box>
        <input
          type="text"
          inputRef={textareaEl}
          className={classes.textField}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={comment}
          placeholder="Write a comment..."
          id="input"
        />
        <IconButton
          size="small"
          variant="contained"
          className={classes.button}
          color="secondary"
          type="submit"
          ref={buttonEl}
          type="submit"
          // disabled={!comment.trim()}
        >
          <Send />
        </IconButton>
      </form>
    </React.Fragment>
  );
};

export default CreateComment;

CreateComment.propTypes = {
  focus: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
};
