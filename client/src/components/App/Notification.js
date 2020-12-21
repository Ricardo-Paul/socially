import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

const Notification = ({ notification }) => {
  if (!notification.like && !notification.comment && !notification.follow) {
    return;
  }

  let senderName = notification.sender ? notification.sender.fullName : null;

  const showPostImage = () => {
    return (
      <div style={{ width: 45, height: 45, marginLeft: 5 }}>
        <img
          alt="post-pic"
          src={notification.like.post.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt="user avatar" src={notification.sender.image} />
        </ListItemAvatar>
        {notification.like && (
          <>
            <ListItemText secondary={`${senderName} likes your post`} />
            {showPostImage}
          </>
        )}

        {notification.comment && (
          <>
            <ListItemText secondary={`${senderName} commented on your post`} />
            {showPostImage}
          </>
        )}
      </ListItem>
    </React.Fragment>
  );
};

export default Notification;
