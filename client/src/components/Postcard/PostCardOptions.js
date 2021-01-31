import React from "react";
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import useTheme from "@material-ui/core/styles/useTheme";
import PropTypes from "prop-types";
import { generatePath, Link } from "react-router-dom";
import * as Routes from "../../routes";
import { useStore } from "../../store";
import { Delete, FileCopy, PersonAdd } from "@material-ui/icons";
import Follow from "../Follow";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  button_link: {
    color: theme.palette.primary.contrastText,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "1rem",
    textDecoration: "none",
    padding: "0.3rem",
    borderRadius: ".2rem",
    // backgroundColor: theme.palette.custom.palette.paleNuance,
    marginBottom: "0.2rem",

    "&:hover":{
      backgroundColor: theme.palette.primary.dark
    },
  },
  button_link_text:{
    display: "flex",
    flexDirection: "column"
  },
  link_subtext: {
    fontSize: ".8rem",
  }
}))

const PostCardOptions = ({ closeMenu, postId, postAuthor, deletePost }) => {
  const [{ auth }] = useStore();
  const theme = useTheme();
  const classes = useStyles();
  const isUserPost = postAuthor.id === auth.user.id;

  const paper_style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: theme.palette.primary.main,
    borderRadius: ".8rem",
    // height: "12rem",
    padding: ".3rem",
    // paddingRight: "5rem",
    border: theme.palette.custom.border
  }

  const copyUrl=()=> {
    let absUrl = `${process.env.REACT_APP_CLIENT_URL}${generatePath(Routes.POST,{id: postId,})}`;
    navigator.clipboard.writeText(absUrl);
    closeMenu();
  };

  return (
      <ClickAwayListener onClickAway={closeMenu}>
        <Paper elevation={3} style={paper_style} >
          <Link className={classes.button_link} onClick={copyUrl}>
            <FileCopy style={{ marginRight: 10 }} />
            <Box className={classes.button_link_text}>
              Copy url
              <span className={classes.link_subtext}>
                Copy this post url to the clipboard
              </span>
            </Box>
          </Link>
          {isUserPost && (
            <Link className={classes.button_link} onClick={deletePost}>
              <Delete style={{ marginRight: 10 }} />
              <Box className={classes.button_link_text}>
                Delete
                <span className={classes.link_subtext}>
                  This action can't be undone
                </span>
              </Box>
            </Link>
          )}
          {!isUserPost && <Follow user={postAuthor} icon={PersonAdd} />}
        </Paper>
      </ClickAwayListener>
  );
};

PostCardOptions.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  postAuthor: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default PostCardOptions;
