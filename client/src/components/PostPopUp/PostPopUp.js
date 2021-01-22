import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../utils/theme";
import {
  Card,
  CardHeader,
  CardContent,
  ClickAwayListener,
  Avatar,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PostPopUpComments from "./PostPopUpComments";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";

const useStyles = makeStyles({ 
  imageContainer: {
    width: "100%",
    height: "auto"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageParent: {
    display: "flex",
    alignItems: "center"
  }
});

const PostPopUp = ({
  closeModal,
  id
}) => {
  const classes = useStyles();

  const { data, loading } = useQuery(GET_POST, {
    variables: { id }
  });

  if(!loading){
    console.log('POST DATA', data)
  }

  if(loading){
    return <h3> loading... </h3>
  }

  const post = data && data.getPost;

  return (
    <ClickAwayListener onClickAway={closeModal}>
      <Grid container style={{height: "100%"}}>
        <Grid item md={9} xs={12}>
            <Grid container justify="center" style={{height: "100%"}}>
              <Grid item md={6} className={classes.imageParent} style={{height: "100%"}}>
                <Box className={classes.imageContainer}>
                  <img 
                    src={post.image}
                    alt="post picture"
                    className={classes.image}
                  />
              </Box>
              </Grid>
            </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          COMMENTS
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
};

export default PostPopUp;

PostPopUp.propTypes = {
  closeModal: PropTypes.func,
  comments: PropTypes.array.isRequired,
  author: PropTypes.string.isRequired,
  postTitle: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

{/* <Paper className={classes.paper}>
<Card className={classes.card}>
  <CardHeader
    avatar={<Avatar src={post.author.image} />}
    action={
      <IconButton onClick={closeModal}>
        <Close />
      </IconButton>
    }
    title={post.author.fullName}
    subheader={post.createdAt}
  />
  <CardContent> {post.title} </CardContent>
  {post.image && 
    <div className={classes.mediaContainer}>
      <img src={post.image} alt="post image" className={classes.media} />
    </div>
  }
  <PostPopUpComments postId={post.id} comments={post.comments} closeComments={closeModal} />
</Card>
</Paper> */}