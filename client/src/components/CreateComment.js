import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, TextField, IconButton } from "@material-ui/core";
import { theme } from "../utils/theme";
import { CREATE_COMMENT } from "../graphql/comment";
import { useMutation } from "@apollo/client";
import { useStore } from "../store";
import { Send } from "@material-ui/icons";

import { GET_AUTH_USER, GET_USER_POSTS } from "../graphql/user";
import { GET_FOLLOWED_POSTS, GET_POST } from "../graphql/post";
import { HOME_PAGE_POSTS_LIMIT, USER_PAGE_POSTS_LIMIT } from "../constants/DataLimit";

const text_color = "#e4e6eb"

const commenStyles = makeStyles({
  textField: {
    marginRight: 5,
    padding: 13,
    paddingLeft: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
    },
    backgroundColor: "#636362",
    borderRadius: 20,
    outline: "none",
    border: "none",
    width: "90%",
    color: `${text_color}`,
    '&::placeholder': {
      color: `${text_color}`
    },
    fontSize: "1rem"
  },
  form: {
    display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // [theme.breakpoints.down("sm")]: {
    //   // flexDirection: "column",
    // },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      // width: "100%",
    },
  },
});

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
      {
        query: GET_USER_POSTS,
        variables: {
          username: auth.user.username,
          limit: USER_PAGE_POSTS_LIMIT
        }
      },
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
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="text"
          inputRef={textareaEl}
          className={classes.textField}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={comment}
          placeholder="comment..."
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
    </>
  );
};

export default CreateComment;

CreateComment.propTypes = {
  focus: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
};
