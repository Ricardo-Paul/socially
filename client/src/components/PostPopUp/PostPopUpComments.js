import React, { Fragment } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Paper,
  Avatar,
  makeStyles
} from "@material-ui/core";

const i =
  "https://res.cloudinary.com/socially/image/upload/v1604363431/samples/bike.jpg";

  const commentsStyles = makeStyles({
    paper:{
      maxHeight: 300
    }
  })

const PostPopUpComments = ({ comments }) => {
  const classes = commentsStyles();

  return (
      <List >
       {comments.map((c) => (
          <ListItem>
          <ListItemAvatar>
          <Avatar alt="user avatar" src={i} />
          </ListItemAvatar>
          <ListItemText
          primary={"Ali Conner"}
          secondary={
              <Fragment>
              <Typography component="span" variant="body2">
                  2 days ago
              </Typography>
              {"- That is perfectly accurate"}
              </Fragment>
          }
          />
      </ListItem>
       ))}
        <Divider variant="inset" component="li" />
      </List>
  );
};

export default PostPopUpComments;
