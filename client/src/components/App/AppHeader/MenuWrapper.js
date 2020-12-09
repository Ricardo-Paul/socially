import React from "react";
import { Popper, Grow, Paper, ClickAwayListener } from "@material-ui/core";
import headerStyles from "./headerStyles";

const MenuWrapper = ({ isOpen, anchorEl, closeMenu, children }) => {
  const classes = headerStyles();

  return (
    <Popper
      className={classes.popper}
      anchorEl={anchorEl}
      open={isOpen}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <ClickAwayListener onClickAway={closeMenu}>
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "top" ? "center bottom" : "center top",
            }}
          >
            <Paper elevation={5}>{children}</Paper>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default MenuWrapper;
