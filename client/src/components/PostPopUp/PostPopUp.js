import React from "react";
import { Box, Button, Grid, Hidden, makeStyles, Typography } from "@material-ui/core";
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
import { Close, MoreHoriz } from "@material-ui/icons";
import PostPopUpComments from "./PostPopUpComments";
import PostPopUpHeader from "./PostPopUpHeader";

import CreateComment from "../CreateComment";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';


const text_color = "#e4e6eb"
const light_background = "#545454"
const dark_background = "#373737"

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
  },
  right: {
    backgroundColor: `${dark_background}`,
    color: `${text_color}`,
    fontSize: "1rem",
    width: "100%",
    height: "100%",

    position: "relative"
  },
  right_header: {
    padding: 10,
    width: "100%",
    borderBottom: "0.5px solid #727273",
    display: "flex",
    justifyContent:"flex-end"
  },
  right_header_icons: {
    backgroundColor: `${light_background}`,
    color: `${text_color}`,
    width: 50,
    height: 50,
    margin: "0.2rem"
  },
  post_info: {
    padding: "1.5rem",
    backgroundColor: `${light_background}`,
    margin: "0.6rem",
    borderRadius: 10
  },
  user_info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10
  },
  left_user_info: {
    display: "flex"
  },
  name_and_hour: {

  },
  like_comment_info: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20
  },
  like_comment_buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottom: "0.5px solid #727273",
    borderTop: "0.5px solid #727273",
    padding: 5,
  },
  like_comment_button: {
    width: "70%",
    '&:hover': {
      backgroundColor: `${dark_background}`,
    }
  },
  create_comment: {
    // width: "100%",
    margin: "0.5rem"
  }
});
// #848484
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

  const dummyText = "A new Administration means a new lunch partner. My first weekly lunch with Vice President Kamala Harris is in the books!"
  const avatar = "https://material-ui.com/static/images/avatar/3.jpg";
  const name_and_hour = ["President Joe Biden", "12h"]

  const inner_color = {color: `${text_color}`}

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
          <Box className={classes.right}>
              <PostPopUpHeader image={post.author.image} />
              <Box className={classes.post_info}>
                <Box className={classes.user_info}>
                  <Box className={classes.left_user_info}>
                    <Avatar src={avatar} style={{ marginRight: 5 }} />
                    <Box className={classes.name_and_hour}>
                      <Typography>
                        <Box fontWeight="bold"> {name_and_hour[0]} </Box>
                      </Typography>
                      <Typography> {name_and_hour[1]} </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.right_user_info}>
                    <IconButton style={inner_color}>
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                </Box>
                <Box fontWeight={400} >
                  {dummyText}
                </Box>
                <Box className={classes.like_comment_info}>
                  <Typography> 508K Likes </Typography>
                  <Typography> 20K Comments </Typography>
                  <Typography> 8.3K Shares </Typography>
                </Box>
                <Box className={classes.like_comment_buttons}>
                  <Button className={classes.like_comment_button} style={inner_color} >
                    <ThumbUpAltOutlinedIcon style={{marginRight: "0.5rem"}} />
                    <Hidden xsDown>
                      Like
                    </Hidden>
                  </Button>
                  <Button className={classes.like_comment_button} style={inner_color} > 
                    <ChatBubbleOutlineOutlinedIcon style={{marginRight: "0.5rem"}} />
                    <Hidden xsDown>
                      Comment
                    </Hidden>
                  </Button>
                  <Button className={classes.like_comment_button} style={inner_color} >
                    <ShareOutlinedIcon style={{marginRight: "0.5rem"}} />
                    <Hidden xsDown>
                      Share
                    </Hidden>
                  </Button>
                </Box>
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