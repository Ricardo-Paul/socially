import React from "react";
import { MenuList, MenuItem, Paper, ClickAwayListener } from "@material-ui/core";

const PostCardOptions = ({ closeMenu }) => {
  return (
    <>
    <ClickAwayListener onClickAway={closeMenu}>
    <Paper elevation={3}>
        <MenuList>
          <MenuItem> Copy URL</MenuItem>
          <MenuItem> Delete </MenuItem>
          <MenuItem> Follow </MenuItem>
        </MenuList>
      </Paper>
    </ClickAwayListener>
    </>
  );
};

export default PostCardOptions;
