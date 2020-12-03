import React from "react";
import { Popper, Grow, Paper, MenuList, MenuItem } from '@material-ui/core';
import headerStyles from "./headerStyles";

const HeaderUserDropDown = ({ isOpen, userAnchorEl }) => {
  const classes = headerStyles()

  return (
    <Popper className={classes.popper} anchorEl={userAnchorEl} open={isOpen} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
        {...TransitionProps}
        style={{
          transformOrigin: placement === "top" ? "center bottom" : "center top"
        }}
        >
          <Paper elevation={5}>
            <MenuList>
              <MenuItem> Profile </MenuItem>
              <MenuItem> Logout </MenuItem> 
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default HeaderUserDropDown;
