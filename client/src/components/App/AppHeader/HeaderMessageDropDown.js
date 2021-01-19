import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";
import MenuWrapper from "./MenuWrapper";
import MessageCard from "../../MessageCard";

const HeaderMessageDropDown = ({
  isOpen,
  messageAnchorEl,
  closeMenu,
  dropDownData,
}) => {
  React.useEffect(() => {
    console.log("MESSAGE DATA", dropDownData);
  }, [dropDownData]);
  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={messageAnchorEl}
      closeMenu={closeMenu}
      dropDownData={dropDownData}
    >
      <MenuList>
        {dropDownData.map((u) => {
          return <MessageCard user={u} />;
        })}
      </MenuList>
    </MenuWrapper>
  );
};

export default HeaderMessageDropDown;
