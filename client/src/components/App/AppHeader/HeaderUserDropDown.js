import React from "react";
import { MenuList, MenuItem } from '@material-ui/core';
import headerStyles from "./headerStyles";
import MenuWrapper from './MenuWrapper';

const HeaderUserDropDown = ({ isOpen, userAnchorEl }) => {

  return (
    <MenuWrapper isOpen={isOpen} anchorEl={userAnchorEl}>
        <MenuList>
          <MenuItem> Profile </MenuItem>
          <MenuItem> Logout </MenuItem> 
        </MenuList>
    </MenuWrapper>
  );
};

export default HeaderUserDropDown;
