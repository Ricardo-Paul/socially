import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Box,
} from "@material-ui/core";



import { Delete } from "@material-ui/icons";
import PropTypes from "prop-types";
import { useStore } from "../../store";

import { DELETE_COMMENT } from "../../graphql/comment";
import { useMutation } from "@apollo/client";

import { GET_AUTH_USER } from "../../graphql/user";
import { GET_FOLLOWED_POSTS, GET_POST } from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { withRouter } from "react-router-dom";


const useStyles = makeStyles({
  comment_box: {

  },
  comment: {

  },
  comment_box_span:{

  }
})

const dummyUserName = `Carli Andersen`
const dummyComment = `Glad you had a conversation with my PM today. Justin Trudeau is a true Canadian and a friend of the United States. Glad you had a conversation with my PM today`

const PostPopUpComments = ({ match, comments, postId }) => {
  const [{ auth }] = useStore();
  const classes = useStyles();

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

  return(
    <React.Fragment>
      {comments.map(c => {
        return(
          <Box key={c.id}>
            <Avatar alt="user avatar"src={c.author.image} />
            <Box className={classes.comment_box}>
              <Box fontWeight={300}>
                <Typography> {dummyUserName} </Typography>
              </Box>
              <Box className={classes.comment}>
                {dummyComment}
              </Box>
              <span className={classes.comment_box_span} >
                {`2 days ago`}
              </span>
            </Box>
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

/* <ListItemText
primary={c.author.fullName}
secondary={
  <Fragment>
    <Typography component="span" variant="body2">
      {/* 2 days ago */
//     </Typography>
//     {c.comment}
//   </Fragment>
// }
// />
// <ListItemSecondaryAction>
// {auth.user.id === c.author.id && (
//   <IconButton onClick={() => deleteComment(c.id)}>
//     <Delete />
//   </IconButton>
// )}
// </ListItemSecondaryAction> */}
/* {comments.length > 1 && <Divider variant="inset" component="li" />} */
