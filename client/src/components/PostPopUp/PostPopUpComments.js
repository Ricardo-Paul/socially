import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";
import { useStore } from "../../store";
import { DELETE_COMMENT } from "../../graphql/comment";
import { useMutation } from "@apollo/client";
import { GET_AUTH_USER } from "../../graphql/user";
import { GET_FOLLOWED_POSTS, GET_POST } from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { withRouter } from "react-router-dom";
import { themes } from "../../constants/AppTheme";
import { useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  comment_item: {
    display: "flex",
    padding: "0.5rem",
    position: "relative",
    border: theme.palette.shape.borderColor,
    borderRadius: theme.palette.shape.borderRadius,
    marginBottom: ".5rem"
  },
  comment: {

  },
  comment_box: {
    backgroundColor: theme.palette.primary.light,
    padding: "0.5rem",
    borderRadius: "0.5rem"
  },
  comment_box_span:{
    position: "absolute",
    right: "0.7rem",
    bottom: "-0.78rem",
    padding: "0.2rem",
    borderRadius: "10px",
    display: "none" //partially
  },
  no_comment: {
    padding: "0.5rem",
    fontWeight: 600,
    color: theme.palette.custom.palette.helperText,
  }
}))


const no_comment_text = `Be the first to comment`

const PostPopUpComments = ({ match, comments, postId }) => {
  const [{ auth }] = useStore();
  const classes = useStyles();
  const theme = useTheme();


  const [remove] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_AUTH_USER },
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT },
      },
      {
        query: GET_POST,
        variables: {
          id: postId
        }
      }
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

  const isLightTeme = localStorage.getItem("theme") === themes.LIGHT_THEME;
  const comment_light_style = {
    backgroundColor: `${isLightTeme && `${theme.palette.primary.main}`}`,
  }

  if(comments.length < 1){
    return(
      <Box className={classes.no_comment}>
        {no_comment_text}
      </Box>
    )
  }

  return(
    <React.Fragment>
      {comments.map(c => {
        return(
          <Box style={comment_light_style} className={classes.comment_item} key={c.id}>
            <Avatar alt="user avatar"src={c.author.image} style={{marginRight: "0.5rem"}} />
            <Box className={classes.comment_box} >
              <Box fontWeight={600}>
                <Typography> {c.author.fullName} </Typography>
              </Box>
              <Box className={classes.comment}>
                {c.comment}
              </Box>
            </Box>
            <span style={comment_light_style} className={classes.comment_box_span} >
              {`2 days ago`}
            </span>
          </Box>
        )
      })}
    </React.Fragment>
  )
};

export default withRouter(PostPopUpComments);

PostPopUpComments.propTypes = {
  comments: PropTypes.array.isRequired,
  userAvatar: PropTypes.string,
  postId: PropTypes.string.isRequired
};
