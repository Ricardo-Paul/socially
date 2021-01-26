import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import PostUserInfo from "./PostUserInfo";
import PostLikeComment from "./PostLikeComment";

const useStyles = makeStyles(theme => ({
  post_info: {
      padding: "1.5rem",
      backgroundColor: theme.palette.primary.light,
      borderRadius: 10,
      marginBottom: "0.7rem"
    }
}))

const dummyText = "A new Administration means a new lunch partner. My first weekly lunch with Vice President Kamala Harris is in the books!"


const PostPopUpInfo = ({ authorImage, authorName, createdAt, username }) => {
  const classes = useStyles();
  
  return(
      <Box className={classes.post_info}>
        <PostUserInfo 
          authorImage={authorImage} 
          authorName={authorName} 
          createdAt={createdAt} 
          username={username}
          />
        <Box fontWeight={400} >
          {dummyText}
        </Box>
        <PostLikeComment />
      </Box>
    )
    }

export default PostPopUpInfo;