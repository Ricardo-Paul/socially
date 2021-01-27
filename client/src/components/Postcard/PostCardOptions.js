import React from "react";
import {
  Paper,
  ClickAwayListener,
  Button,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { generatePath } from "react-router-dom";
import * as Routes from "../../routes";
import { useStore } from "../../store";
import { Delete, FileCopy, PersonAdd } from "@material-ui/icons";
import Follow from "../Follow";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  button_style: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  }
}))

const PostCardOptions = ({ closeMenu, postId, postAuthor, deletePost }) => {
  const [{ auth }] = useStore();
  const theme = useTheme();
  const classes = useStyles();

  const font = { fontSize: 12 };
  //TODO: REPLACE REACT_APP_CLIENT_URL when deployed,
  const copyUrl = () => {
    let absUrl = `${process.env.REACT_APP_CLIENT_URL}${generatePath(
      Routes.POST,
      {
        id: postId,
      }
    )}`;
    navigator.clipboard.writeText(absUrl);
    closeMenu();
  };

  // if the current user id matches the post author id
  const isUserPost = postAuthor.id === auth.user.id;

  return (
    <>
      <ClickAwayListener onClickAway={closeMenu}>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
            width: "12rem",
            height: "12rem",
            padding: ".5rem",
            border: theme.palette.custom.border
          }}
        >
          <Button classes={{root: classes.button_style}} style={font} onClick={copyUrl}>
            {" "}
            <FileCopy style={{ marginRight: 10 }} />
            Copy URL
          </Button>
          {isUserPost && (
            <Button classes={{root: classes.button_style}} style={font} onClick={deletePost}>
              {" "}
              <Delete style={{ marginRight: 10 }} />
              Delete
            </Button>
          )}
          {!isUserPost && <Follow user={postAuthor} icon={PersonAdd} />}
        </Paper>
      </ClickAwayListener>
    </>
  );
};

export default PostCardOptions;

PostCardOptions.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  postAuthor: PropTypes.object.isRequired, // author of the post (postAuthor)
  deletePost: PropTypes.func.isRequired,
};
