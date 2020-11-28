import { Badge, IconButton } from "@material-ui/core";
import React from "react";
import NotificationIcon from "@material-ui/icons/Notifications";
import headerStyles from "./headerStyles";

const Notification = () => {
  const classes = headerStyles();

  return (
    <IconButton color="inherit">
      <Badge badgeContent={10} color="secondary">
        <NotificationIcon fontSize="small" />
      </Badge>
    </IconButton>
  );
};

export default Notification;
