import React from "react";
import { Popper, Grow, Paper, MenuList, MenuItem } from "@material-ui/core"
import headerStyles from "./headerStyles";
import MenuWrapper from "./MenuWrapper";

const HeaderMessageDropDown = ({ isOpen, messageAnchorEl, messageData }) => {

  return(
   <MenuWrapper isOpen={isOpen} anchorEl={messageAnchorEl}>
      <MenuList>
         <MenuItem> First message </MenuItem>
         <MenuItem> Second message </MenuItem>
        </MenuList>
   </MenuWrapper>
  )
   
};

export default HeaderMessageDropDown;
