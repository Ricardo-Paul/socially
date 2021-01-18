import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";
import MenuWrapper from "./MenuWrapper";

const HeaderMessageDropDown = ({
  isOpen,
  messageAnchorEl,
  closeMenu,
  dropDownData,
}) => {
  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={messageAnchorEl}
      closeMenu={closeMenu}
      dropDownData={dropDownData}
    >
      <MenuList>
        <MenuItem> First message </MenuItem>
        <MenuItem> Second message </MenuItem>
      </MenuList>
    </MenuWrapper>
  );
};

export default HeaderMessageDropDown;
