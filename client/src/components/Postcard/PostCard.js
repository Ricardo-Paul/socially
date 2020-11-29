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
  postAuthor
}) => {
  const classes = postCardStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // if anchorEl has any value set it to null
  // otherwise add the event currentTarget to it
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
        <PostCardOptions 
        closeMenu={() => setAnchorEl(null)} 
        postId={postId}  
        postAuthor={postAuthor}
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

          {isCommentOpen && <CreateComment focus={isCommentOpen} />}
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
};
