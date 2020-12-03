import React from "react";
import { Popper, Grow, Paper, MenuList, MenuItem } from '@material-ui/core';
import headerStyles from "./headerStyles";

const MenuWrapper = ({ isOpen, anchorEl, children }) => {
  const classes = headerStyles()

  return (
    <Popper className={classes.popper} anchorEl={anchorEl} open={isOpen} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
        {...TransitionProps}
        style={{
          transformOrigin: placement === "top" ? "center bottom" : "center top"
        }}
        >
          <Paper elevation={5}>
            {children}
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default MenuWrapper;
