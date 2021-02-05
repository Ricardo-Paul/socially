import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Popper,
  Box,
  ClickAwayListener,
} from "@material-ui/core";
import { MoreVert, Comment } from "@material-ui/icons";
import CardHeader from "@material-ui/core/CardHeader";

import PostCardOptions from "./PostCardOptions";
import CreateComment from "../CreateComment";
import Like from "../Like";
import PostPopUpComments from "../PostPopUp/PostPopUpComments";

import { useStore } from "../../store";
import * as Routes from "../../routes";

import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../graphql/post";
import { GET_AUTH_USER, GET_USER_POSTS } from "../../graphql/user";
import { GET_FOLLOWED_POSTS } from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT, USER_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";

import { generatePath, Link } from "react-router-dom";
import PostUserInfo from "../PostPopUp/PostUserInfo";
import PostLikeComment from "../PostPopUp/PostLikeComment";

const useStyles = makeStyles(theme => ({
  post_card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.palette.shape.borderRadius,
    border: theme.palette.shape.borderColor,
    marginTop: 20,
    width: "100%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  cardData: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  icons: {
    paddingX: 0,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  card_header: {
    padding: 10
  },
  media: {
    [theme.breakpoints.up("xl")]: {
      maxHeight: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
    display: "block",
    objectFit: "cover",
    width: "100%",
    cursor: "pointer"
  },
  card_footer: {
    padding: "0rem 1rem 0.09rem 1rem",
  },
  more_comment: {
    cursor: "pointer",
    '&:hover':{
      textDecoration: "underline"
    }
  }
}));

const PostCard = ({
  title: content,
  fullName,
  image,
  avatar,
  username,
  openModal,
  likeNumber,
  commentNumber,
  likes,
  postId,
  postAuthor,
  imagePublicId,
  comments,
}) => {
  const classes = useStyles();
  const [{ auth }] = useStore();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [recentComments, setRecentComments] = useState([]);
  const [isCreateCommentOpen, setCreateCommentOpen] = React.useState(false);
  const isMoreComments = comments && comments.length > 1;
  const likeProps = { likes, postId, author: postAuthor }


  React.useEffect(() => {
    if(comments.length >= 2){
      const sortedComments = comments.sort((a, b) => {
        return a.createdAt.toString().localeCompare(b.createdAt.toString())
      });
      setRecentComments(sortedComments.slice(-1))
    } else{
      setRecentComments(comments)
    }
  }, [comments, postId]);



  // if anchorEl has any value set it to null
  // otherwise add the event currentTarget to it
  const openPopOver = (event) =>
    setAnchorEl(
      anchorEl && anchorEl.contains(event.target) ? null : event.currentTarget
    );

  const closePopOver = () => setAnchorEl(null);

  const [remove] = useMutation(DELETE_POST, {
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
      }
    ],
  });

  const deletePost = async () => {
    try {
      await remove({
        variables: { input: { id: postId, imagePublicId } },
      });
    } catch (err) {
      console.log(err);
    }
    setAnchorEl(null);
  };

  const dummyDate = `13 days ago`
  const moreCommentText = `See more comments`;

  return (
    <Fragment>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
        <ClickAwayListener onClickAway={() => setAnchorEl(null)} >
          <PostCardOptions
            closeMenu={() => setAnchorEl(null)}
            postId={postId}
            postAuthor={postAuthor}
            imagePublicId={imagePublicId}
            deletePost={deletePost}
          />
        </ClickAwayListener>
      </Popper>
      <div className={classes.post_card}>
        <Box className={classes.card_header}>
          <PostUserInfo 
          authorImage={avatar} 
          authorName={fullName} 
          createdAt={dummyDate} 
          username={username}
          openPopOver={openPopOver}
          />
        </Box>
        <CardContent> { content } </CardContent>
        {image && ( <img className={classes.media} src={image} onClick={openModal} /> )}
        <Box className={classes.card_footer}>
          <PostLikeComment likeProps={likeProps} handleCommentClick={() => setCreateCommentOpen(!isCreateCommentOpen)}  />
          { isCreateCommentOpen && <CreateComment postId={postId} /> }
          <PostPopUpComments comments={recentComments} postId={postId} />
          {isMoreComments && <Box className={classes.more_comment} onClick={openModal}> { moreCommentText } </Box> }
        </Box>
      </div>
    </Fragment>
  );
};

export default PostCard;

PostCard.propTypes = {
  title: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  image: PropTypes.string, //post image
  avatar: PropTypes.string, //author avatar
  openModal: PropTypes.func.isRequired, //called when image is clicked
  imagePublicId: PropTypes.string, // used to delete the image associated to a post
  username: PropTypes.string
};


// <CardHeader
// className={classes.header}
// avatar={<Avatar component={Link} to={generatePath(Routes.PROFILE, {
//   username
// })} alt="user photo" src={avatar} />}
// title={
//   <Link style={{textDecoration: "none"}} to={generatePath(Routes.PROFILE, {
//     username
//   })}> {fullName} </Link>
// }
// action={
//   <IconButton onClick={handleClick}>
//     <MoreVert />
//   </IconButton>
// } 
// subheader={"5 hours ago"}
// />


{/* <div className={classes.footer}>
<div className={classes.cardData}>
  <h5>
    {" "}
    {likeNumber} {likeNumber > 1 ? "likes" : "like"}{" "}
  </h5>
  <h5>
    {" "}
    {commentNumber} {commentNumber > 1 ? "comments" : "comment"}{" "}
  </h5>
</div>
<Divider />
<div className={classes.icons}>
  <Like likes={likes} postId={postId} author={postAuthor} />
  <IconButton onClick={() => setIsCommentOpen(!isCommentOpen)}>
    <Comment />
  </IconButton>
</div>
{isCommentOpen && (
  <PostPopUpComments
    comments={comments}
    closeComments={() => setIsCommentOpen(false)}
    postId={postId}
  />
)}
{isCommentOpen && (
  <CreateComment postId={postId} focus={isCommentOpen} />
)}
</div> */}