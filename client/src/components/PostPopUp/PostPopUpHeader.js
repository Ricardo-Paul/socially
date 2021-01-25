import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

const text_color = "#e4e6eb"
const light_background = "#545454"

const useStyles = makeStyles(theme => ({
  right_header: {
    padding: 10,
    width: "100%",
    borderBottom: "0.5px solid #727273",
    display: "flex",
    justifyContent:"flex-end"
  },
  right_header_icons: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    width: 50,
    height: 50,
    margin: "0.2rem"
  },
}))

const PostPopUpHeader = ({ image }) => {
  const classes = useStyles();

    return(
      <Box className={classes.right_header}>
      <IconButton className={classes.right_header_icons}>
        <ChatBubbleOutlineOutlinedIcon />
      </IconButton>
      <IconButton className={classes.right_header_icons}>
        <NotificationsNoneOutlinedIcon />
      </IconButton>
      <IconButton className={classes.right_header_icons}>
        <Avatar src={image} />
      </IconButton>
    </Box>
    )
}

export default PostPopUpHeader;