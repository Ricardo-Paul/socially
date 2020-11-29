import React from "react";
import { MenuList, MenuItem, Paper, ClickAwayListener, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';


const PostCardOptions = ({ closeMenu }) => {
  const font={fontSize: 12}
  const copyUrl = () => {
    closeMenu();
  };

  
  return (
    <>
    <ClickAwayListener onClickAway={closeMenu}>
    <Paper elevation={3}>
        <MenuList>
          <MenuItem style={font} onClick={copyUrl}>
              Copy URL
          </MenuItem>
          <MenuItem style={font}> Delete </MenuItem>
          <MenuItem style={font}> Follow </MenuItem>
        </MenuList>
      </Paper>
    </ClickAwayListener>
    </>
  );
};

export default PostCardOptions;

PostCardOptions.propTypes = {
  closeMenu: PropTypes.func.isRequired
}