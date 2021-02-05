import React from "react";
import { Popper, Grow, Box, ClickAwayListener } from "@material-ui/core";
import headerStyles from "./headerStyles";

const MenuWrapper = ({ isOpen, anchorEl, closeMenu, children, ...rest }) => {
  const classes = headerStyles();
 
  return (
    <Popper
      className={classes.popper}
      anchorEl={anchorEl}
      open={isOpen}
      transition
      disablePortal
      {...rest}
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
            <Box fontSize="1rem">
              {children}
            </Box>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default MenuWrapper;
