import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"

import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { Hidden } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import useTheme from "@material-ui/core/styles/useTheme"
import PostUserInfo from "./PostUserInfo";

const text_color = "#e4e6eb"
const light_background = "#545454"
const dark_background = "#373737"

const useStyles = makeStyles(theme => ({
  post_info: {
      padding: "1.5rem",
      backgroundColor: theme.palette.primary.light,
      borderRadius: 10,
      marginBottom: "0.7rem"
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
        backgroundColor: theme.palette.primary.main,
      }
    },
}))

  const dummyText = "A new Administration means a new lunch partner. My first weekly lunch with Vice President Kamala Harris is in the books!"
  const name_and_hour = ["President Joe Biden", "12h"]



    const PostPopUpInfo = ({ authorImage, authorName, createdAt, username }) => {
        const classes = useStyles();
        const theme = useTheme();
        const inner_color = {color: theme.palette.primary.contrastText}

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
                <Box fontSize="0.9rem" className={classes.like_comment_info}>
                  <span> {"508K Likes"} </span>
                  <span> {"20K Comments"} </span>
                  <span> {"8.3K Shares"} </span>
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
            )
        }

export default PostPopUpInfo;