import { Badge, IconButton } from "@material-ui/core";
import React from "react";
import NotificationIcon from "@material-ui/icons/Notifications";
import headerStyles from "./headerStyles";
import { useStore } from "../../../store";

const Notification = () => {
  const classes = headerStyles();
  const [{auth}] = useStore();

  const [notifications, setNotifications] = React.useState('')

    React.useEffect(() => {
      if(auth.user != null){
        setNotifications(auth.user.notifications.length);
      }
    }, [auth]);


  return (
    <IconButton color="inherit">
      <Badge badgeContent={notifications} color="secondary">
        <NotificationIcon fontSize="small" />
      </Badge>
    </IconButton>
  );
};

export default Notification;
