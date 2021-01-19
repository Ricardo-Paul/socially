import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  makeStyles,
  Box
} from "@material-ui/core";
import { UPDATE_NOTIFICATION_SEEN } from "../../graphql/notification";
import { useMutation } from "@apollo/client";
import { useStore } from "../../store";
import { Link, generatePath } from "react-router-dom";
import * as Routes from '../../routes';
import defaultAvatar from "../../ressources/defaultAvatar.jpg";

const notiStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    border: "0.1px #afafaf",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  name: {
    fontSize: "16px",
    fontFamily: "roboto",
    fontWeight: 500,
  },
}));

const Notification = ({ notification }) => {
  const [{ auth }] = useStore();
  const classes = notiStyles();

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
      <ListItem
            disableGutters
            className={classes.item}
            component={Link}
            // to={generatePath(Routes.PROFILE, {
            //   username: notification.sender.username
            // })}
          >
            <img
              src={notification.sender.image || defaultAvatar}
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                objectFit: "cover",
              }}
              href={generatePath(Routes.PROFILE, {
                username: notification.sender.username
              })}
            />
            <Box display="flex" flexDirection="column">
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
            </Box>
      </ListItem>
    </React.Fragment>
  );
};

export default Notification;
