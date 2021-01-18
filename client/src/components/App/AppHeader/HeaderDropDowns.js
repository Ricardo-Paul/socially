import React from "react";
import HeaderMessageDropDown from "./HeaderMessageDropDown";
import HeaderNotificationDropDown from "./HeaderNotificationDropDown";
import HeaderUserDropDown from "./HeaderUserDropDown";

/**
 * identify what dropdown is open and render it
 *
 * @param {string} dropDownOpen
 * @param {array}  dropDownData
 *
 */

const HeaderDropDowns = ({
  dropDownOpen,
  dropDownData,
  isOpen,
  notificationAnchorEl,
  messageAnchorEl,
  userAnchorEl,
  closeMenu,
}) => {
  const DropDowns = {
    NOTIFICATION: (
      <HeaderNotificationDropDown
        dropDownData={dropDownData}
        notificationAnchorEl={notificationAnchorEl}
        isOpen={isOpen}
        closeMenu={closeMenu}
      />
    ),
    MESSAGE: (
      <HeaderMessageDropDown
        dropDownData={dropDownData}
        isOpen={isOpen}
        messageAnchorEl={messageAnchorEl}
        closeMenu={closeMenu}
      />
    ),
    USER: (
      <HeaderUserDropDown
        isOpen={isOpen}
        userAnchorEl={userAnchorEl}
        closeMenu={closeMenu}
      />
    ),
  };
  return dropDownOpen ? DropDowns[dropDownOpen] : null;
};

export default HeaderDropDowns;
