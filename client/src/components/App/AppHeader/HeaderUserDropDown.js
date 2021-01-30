import React from "react";
import { MenuList, useTheme } from "@material-ui/core";
import MenuWrapper from "./MenuWrapper";
import { generatePath, Link } from "react-router-dom";
import { PROFILE } from "../../../routes";
import { useStore } from "../../../store";
import Logout from "../../Logout";

const HeaderUserDropDown = ({ isOpen, userAnchorEl, closeMenu }) => {
  const [{ auth }] = useStore();
  const theme = useTheme();
  const text_color = theme.palette.primary.contrastText;

  return (
    <MenuWrapper isOpen={isOpen} anchorEl={userAnchorEl} closeMenu={closeMenu}>
      <MenuList style={{display: "flex", flexDirection: "column"}}>
        <Link
          to={generatePath(PROFILE, {
            username: auth.user.username,
          })}
          style={{ textDecoration: "none", color: text_color, padding: ".5rem" }}
          onClick={closeMenu}>
          Profile
        </Link>
        <Logout />
      </MenuList>
    </MenuWrapper>
  );
};

export default HeaderUserDropDown;
