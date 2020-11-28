import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";

const User = ({ openProfileMenu }) => {
  return (
    <IconButton color="inherit" onClick={openProfileMenu}>
      <AccountCircle />
    </IconButton>
  );
};

export default User;
