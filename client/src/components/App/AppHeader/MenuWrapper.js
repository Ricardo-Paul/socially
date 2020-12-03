import React from "react";
import { Popper, Grow, Paper, ClickAwayListener} from '@material-ui/core';
import headerStyles from "./headerStyles";

const MenuWrapper = ({ isOpen, anchorEl, closeMenu,children }) => {
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
          <ClickAwayListener onClickAway={closeMenu}>
            <Paper elevation={5}>
              {children}
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
  );
};

export default MenuWrapper;
