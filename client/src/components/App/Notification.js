import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { UPDATE_NOTIFICATION_SEEN } from "../../graphql/notification";
import { useMutation } from "@apollo/client";
import { useStore } from "../../store";

const Notification = ({ notification }) => {
  const [{ auth }] = useStore();

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION_SEEN, {
    variables: {
      input: { receiverId: auth.user.id },
    },
  });

  React.useEffect(() => {
    const update = async () => {
      try {
        const r = await updateNotification();
        console.log(r);
      } catch (err) {
        console.log(err);
      }
    };

    update();
  }, [auth.user.id]);

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
