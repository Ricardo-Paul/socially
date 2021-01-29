import React, { Fragment } from "react";
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
import { GET_AUTH_USER } from "../../graphql/user";
import { LocalDining } from "@material-ui/icons";

const notiStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    border: "0.1px #afafaf",
    cursor: "pointer",
    color: theme.palette.primary.contrastText,
    borderRadius: ".5rem",

    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  name: {
    fontSize: "16px",
    fontFamily: "roboto",
    fontWeight: 500,
  },
}));

const Notification = ({ notification, loading, closeMenu }) => {
  console.log('NOTIFI ', notification);
  
  const [{ auth }] = useStore();
  const classes = notiStyles();

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION_SEEN, {
    variables: {
      input: { receiverId: auth.user.id },
    },
    refetchQueries: [
      {query: GET_AUTH_USER}
    ]
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

  const senderName = notification.sender ? notification.sender.fullName : null;
  const isLikeOrComment = notification.comment || notification.like;

  const showPostImage = () => {
    if(loading) return (<h3> Please wait... </h3>) 
    if(!notification.like){
      return <h3>  </h3>
    }
    return (
      <div style={{ width: "4rem", height: "4rem" }}>
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
        onClick={closeMenu}
        disableGutters
        className={classes.item}
        component={Link}
        to={generatePath(Routes.POST, {
          id: isLikeOrComment.post.id
        })}>
          <Link
            to={generatePath(Routes.PROFILE, {
              username: notification.sender.username
            })}
          >
              <img
                src={notification.sender.image || defaultAvatar}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  objectFit: "cover",
                  borderRadius: "50%"
                }}
              />
            </Link>

            <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
              {notification.like && (
              <Fragment>
                <Box> <span style={{fontWeight:"bold"}}> {senderName} </span> liked your post </Box>
                {showPostImage()}
              </Fragment>
            )}

            {notification.comment && (
              <Fragment>
                <Box>  <span style={{fontWeight:"bold"}}> {senderName} </span> commented on your post </Box>
                {showPostImage()}
              </Fragment>
            )}
            </Box>
      </ListItem>
    </React.Fragment>
  );
};

export default Notification;
