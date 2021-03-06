import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { ClickAwayListener } from "@material-ui/core";
import PostPopUpComments from "./PostPopUpComments";
import PostPopUpHeader from "./PostPopUpHeader";
import PostPopUpInfo from "./PostPopUpInfo";


import CreateComment from "../CreateComment";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";
import LoadingIndicator from "../LoadingIndicator";

const text_color = "#e4e6eb"
const light_background = "#545454"
const dark_background = "#373737"

const useStyles = makeStyles(theme => ({
  left: {
    backgroundColor: theme.palette.primary.dark
  },
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
  },
  right: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: "1rem",
    width: "100%",
    height: "100%",

    position: "relative",
  },
  right_header: {
    padding: 10,
    width: "100%",
    borderBottom: "0.5px solid #727273",
    display: "flex",
    justifyContent:"flex-end"
  },
  right_body: {
    [theme.breakpoints.up("sm")]:{
      // overflow: "auto",
      // maxHeight: "calc(100vh - 140px)",
    },
    padding: "0.7rem",
  },
  right_header_icons: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    width: 50,
    height: 50,
    margin: "0.2rem"
  },
  create_comment: {
    margin: "0.5rem"
  }
}));

const PostPopUp = ({ closeModal, id }) => {
  const classes = useStyles();

  const { data, loading } = useQuery(GET_POST, {
    variables: { id }
  });

  if(!loading) console.log('POST DATA', data)
  if(loading) return <Box display="flex" color="white" justifyContent="center"> <LoadingIndicator /></Box>
  
  const post = data && data.getPost;
  const { id: postId, image, title, comments, likes, author: { image: authorImage, fullName, username } } = post;
  console.log('COMMENTS', comments)

  const likeProps = {
    likes,
    postId,
    author: post.author
  }

  return (
    <ClickAwayListener onClickAway={closeModal}>
      <Grid container style={{height: "100%"}}>
        <Grid item md={8} xl={9} xs={12} className={classes.left} >
            <Grid container justify="center" style={{height: "100%"}}>
              <Grid item md={7} className={classes.imageParent} style={{height: "100%"}}>
                <Box className={classes.imageContainer}>
                  <img 
                    src={image}
                    alt="post picture"
                    className={classes.image}
                  />
              </Box>
              </Grid>
            </Grid>
        </Grid>
        <Grid item md={4} xl={3} xs={12}>
          <Box className={classes.right}>
              {/* TODO: if features are implemented show header */}
              {/* <PostPopUpHeader image={authorImage} /> */}
              <Box className={classes.right_body}>
                <PostPopUpInfo 
                authorImage={authorImage} 
                authorName={fullName} 
                createdAt={'12h'}
                username={username}
                likeProps={likeProps}
                title={title}
                comments={comments}
                />
                <PostPopUpComments comments={comments} />
              </Box>
              <Box className={classes.create_comment}>
                <CreateComment focus={true} postId={post.id} />
              </Box>
          </Box>
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