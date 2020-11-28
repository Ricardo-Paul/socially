import React from "react";
import { Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import headerStyles from "./headerStyles";

const Message = () => {
  const classes = headerStyles();

  return (
    <IconButton color="inherit">
      <Badge badgeContent={4} color="secondary">
        <MailIcon fontSize="small" />
      </Badge>
    </IconButton>
  );
};

export default Message;
