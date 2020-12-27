import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";
import MenuWrapper from "./MenuWrapper";
import { generatePath, Link } from "react-router-dom";
import { PROFILE } from "../../../routes";
import { useStore } from "../../../store";
import Logout from "../../Logout";

const HeaderUserDropDown = ({ isOpen, userAnchorEl, closeMenu }) => {
  const [{ auth }] = useStore();

  return (
    <MenuWrapper isOpen={isOpen} anchorEl={userAnchorEl} closeMenu={closeMenu}>
      <MenuList>
        <Link
          to={generatePath(PROFILE, {
            username: auth.user.username,
          })}
          style={{ textDecoration: "none" }}
          onClick={closeMenu}
        >
          <MenuItem> Profile </MenuItem>
        </Link>
        <Logout />
      </MenuList>
    </MenuWrapper>
  );
};

export default HeaderUserDropDown;
