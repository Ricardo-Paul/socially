import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Popper,
} from "@material-ui/core";
import { MoreVert, Comment } from "@material-ui/icons";
import CardHeader from "@material-ui/core/CardHeader";

import { shadows } from "../../utils/theme";
import PostCardOptions from "./PostCardOptions";
import CreateComment from "../CreateComment";
import Like from '../Like'
import PostPopUpComments from '../PostPopUp/PostPopUpComments';

import { useStore } from '../../store';


// delete post imports
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../graphql/post';
import { GET_AUTH_USER } from '../../graphql/user';
import { GET_FOLLOWED_POSTS } from '../../graphql/post';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';

import { colors, theme } from '../../utils/theme'

const postCardStyles = makeStyles({
  card: {
    marginTop: 20,
    maxWidth: "70%",
    boxShadow: shadows.md,

    // transform: "translate(-50%, -50%)",
    // backgroundColor: "white",
    // position: "absolute",
    // width: "30%"
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    },
  },
  cardData: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  icons: {
    paddingX: 0,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  media: {
    height: 190,
    objectFit: "cover",
  },
  footer: {
    position: "relative",
  },
});

const PostCard = ({ 
  title, 
  username, 
  image, 
  avatar, 
  openModal, 
  likeNumber, 
  commentNumber,
  likes,
  postId,
  postAuthor,
  imagePublicId,
  comments
}) => {
  const classes = postCardStyles();
  const [{auth}] = useStore();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // if anchorEl has any value set it to null
  // otherwise add the event currentTarget to it
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

  const [remove] = useMutation(DELETE_POST,{
    refetchQueries: [
      {query: GET_AUTH_USER},
      {query: GET_FOLLOWED_POSTS, variables:{ userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT }}
  ]
})

  const deletePost = async () => {
    console.log(postAuthor.id, auth.user.id);
    try{
      const { data } = await remove({
        variables: { input: { id: postId, imagePublicId}}
      });
      console.log("DELETED", data);
    }catch(err){
      console.log(err)
    }
    setAnchorEl(null);
  }

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
        <PostCardOptions 
        closeMenu={() => setAnchorEl(null)} 
        postId={postId}  
        postAuthor={postAuthor}
        imagePublicId={imagePublicId}
        deletePost={deletePost}
        />
      </Popper>

      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={<Avatar alt="user photo" src={avatar} />}
          title={username}
          action={
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          }
          subheader={"5 hours ago"}
        />
        <CardContent>{title}</CardContent>
        {image && <CardMedia
          className={classes.media}
          image={image}
          onClick={openModal}
        />}
        <div className={classes.footer}>
          <div className={classes.cardData}>
            <h5> {likeNumber} {likeNumber > 1? 'likes': 'like'} </h5>
            <h5> {commentNumber} {commentNumber > 1? 'comments': 'comment'} </h5>
          </div>
          <Divider />
          <div className={classes.icons}>

            <Like likes={likes} postId={postId} />
            <IconButton onClick={() => setIsCommentOpen(!isCommentOpen)}>
              <Comment />
            </IconButton>
          </div>
          { isCommentOpen && <PostPopUpComments comments={comments} /> }
          {isCommentOpen && <CreateComment postId={postId} focus={isCommentOpen} />}
        </div>
      </Card>
    </>
  );
};

export default PostCard;

PostCard.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string.isRequired,
  image: PropTypes.string, //post image
  avatar: PropTypes.string, //author avatar
  openModal: PropTypes.func.isRequired, //called when image is clicked
  imagePublicId: PropTypes.string, // used to delete the image associated to a post
};
