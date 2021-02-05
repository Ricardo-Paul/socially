import React from "react";
import { Popper, Grow, Box, ClickAwayListener, Fade } from "@material-ui/core";
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
      style={{position: "absolute", left: "5px"}}
    >
      {({ TransitionProps, placement }) => (
        <ClickAwayListener onClickAway={closeMenu}>
          {/* <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "top" ? "center bottom" : "center top",
            }}
          > */}
            <Box fontSize="1rem">
              {children}
            </Box>
          {/* </Fade> */}
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default MenuWrapper;
