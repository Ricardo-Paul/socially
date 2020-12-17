import React from "react";
import { List, MenuItem, Typography } from "@material-ui/core";

import MenuWrapper from "./MenuWrapper";
import Notification from "../Notification";

const HeaderNotificationDropDown = ({
  dropDownData,
  notificationAnchorEl,
  isOpen,
  closeMenu,
}) => {
  console.log("notification HD", dropDownData);
  let notifications = dropDownData;

  if(!notifications.length > 0){
    return(
      <MenuWrapper
      isOpen={isOpen}
      anchorEl={notificationAnchorEl}
      closeMenu={closeMenu}
    >
      <Typography color="textSecondary" style={{padding: 10}}> No notification </Typography>
    </MenuWrapper>
    )
  }

  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={notificationAnchorEl}
      closeMenu={closeMenu}
    >
      <List>
        {notifications.map((n) => (
          <Notification key={n.id} notification={n} />
        ))}
      </List>
    </MenuWrapper>
  );
};

export default HeaderNotificationDropDown;
