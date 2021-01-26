import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { Hidden } from "@material-ui/core";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import useTheme from "@material-ui/core/styles/useTheme";
import PropTypes from "prop-types";
import Like from "../Like";


const useStyles = makeStyles(theme => ({
    like_comment_info: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
      },
      like_comment_buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 5,
        // borderBottom: "0.5px solid #727273",
        // borderTop: "0.5px solid #727273",
        padding: 5,
      },
      like_comment_button: {
        width: "30%",
        backgroundColor: theme.palette.custom.palette.paleNuance,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        }
      },
}))

const PostLikeComment = ({ handleCommentClick, likeProps }) => {
    const classes = useStyles();
    const theme = useTheme();
    const inner_color = {color: theme.palette.primary.contrastText}
    // const { likes, postId, author } = likeProps;

  return (
    <Fragment>
      <Box fontSize="0.9rem" className={classes.like_comment_info}>
        <span> {"508K Likes"} </span>
        <span> {"20K Comments"} </span>
        <span> {"8.3K Shares"} </span>
      </Box>
      <Box className={classes.like_comment_buttons}>
        <Like {...likeProps} like_style={classes.like_comment_button} />
        <Button onClick={handleCommentClick} className={classes.like_comment_button} style={inner_color}>
          <ChatBubbleOutlineOutlinedIcon style={{ marginRight: "0.5rem" }} />
          <Hidden xsDown>Comment</Hidden>
        </Button>
        <Button className={classes.like_comment_button} style={inner_color}>
          <ShareOutlinedIcon style={{ marginRight: "0.5rem" }} />
          <Hidden xsDown>Share</Hidden>
        </Button>
      </Box>
    </Fragment>
  );
};

PostLikeComment.propTypes = {
  handleCommentClick: PropTypes.func.isRequired
}

export default PostLikeComment;