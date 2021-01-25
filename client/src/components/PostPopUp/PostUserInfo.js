import React from "react";
import { MoreHoriz } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core";
import { generatePath, Link } from "react-router-dom";
import * as Routes from "../../routes";

const useStyles = makeStyles(theme => ({
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
}))

const PostUserInfo = ({ authorImage, createdAt, authorName, username }) => {
    const classes = useStyles();
    const theme = useTheme();
    const inner_color = {color: theme.palette.primary.contrastText}

    return(
        <Box className={classes.user_info}>
        <Box className={classes.left_user_info}>
          <Avatar component={Link} src={authorImage} style={{ marginRight: 5 }} to={generatePath(Routes.PROFILE, {
              username
          })} />
          <Box className={classes.name_and_hour}>
            <Typography>
              <Box fontWeight="bold"> {authorName} </Box>
            </Typography>
            <Typography> {createdAt} </Typography>
          </Box>
        </Box>
        <Box className={classes.right_user_info}>
          <IconButton style={inner_color}>
            <MoreHoriz />
          </IconButton>
        </Box>
      </Box>
    )
}

export default PostUserInfo;