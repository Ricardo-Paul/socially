import React from "react";
import { MenuList, MenuItem, Paper, ClickAwayListener, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import * as Routes from '../../routes';



const PostCardOptions = ({ closeMenu, postId }) => {
  const font={fontSize: 12}
  // REPLACE REACT_APP_CLIENT_URL when deployed,
  const copyUrl = () => {
    let absUrl = `${process.env.REACT_APP_CLIENT_URL}${generatePath(Routes.POST,{
      id: postId
    })}`
    navigator.clipboard.writeText(absUrl);
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
  closeMenu: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}