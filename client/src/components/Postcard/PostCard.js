import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Popper,
  Box,
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

const postCardStyles = makeStyles(theme => ({
  postCard: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.palette.shape.borderRadius,
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
  footer: {
    position: "relative",
  },
}));

const PostCard = ({
  title,
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
  const classes = postCardStyles();
  const [{ auth }] = useStore();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // if anchorEl has any value set it to null
  // otherwise add the event currentTarget to it
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

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
      {/*  */}
      <div className={classes.postCard}>
        <Box className={classes.card_header}>
          <PostUserInfo 
          authorImage={avatar} 
          authorName={fullName} 
          createdAt={dummyDate} 
          username={username}
          />
        </Box>
        <CardContent>{title}</CardContent>
        {image && (
          <img
            className={classes.media}
            src={image}
            onClick={openModal}
          />
        )}
        <div className={classes.footer}>
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
        </div>
      </div>
    </>
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