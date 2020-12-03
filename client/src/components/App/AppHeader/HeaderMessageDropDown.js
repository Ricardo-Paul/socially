import React from "react";
import { Popper, Grow, Paper, MenuList, MenuItem } from "@material-ui/core"
import headerStyles from "./headerStyles";

const HeaderMessageDropDown = ({ isOpen, messageAnchorEl, messageData }) => {
  const classes = headerStyles();

  return(
    <Popper className={classes.popper} open={isOpen} transition disablePortal anchorEl={messageAnchorEl}>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{
          transformOrigin: placement === "top"? "center bottom": "center top"
        }} >
          <Paper elevation={5}>
            <MenuList>
              <MenuItem> First message </MenuItem>
              <MenuItem> Second message </MenuItem>
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
   
};

export default HeaderMessageDropDown;
