import React from "react";
import { Popper, Grow, Paper, MenuList, MenuItem } from "@material-ui/core"

const HeaderMessageDropDown = ({ isOpen, messageAnchorEl, messageData }) => {

  return(
    <Popper style={{zIndex: 1000}} open={isOpen} transition disablePortal anchorEl={messageAnchorEl}>
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
