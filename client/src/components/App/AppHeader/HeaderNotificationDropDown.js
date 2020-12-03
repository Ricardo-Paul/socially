import React from 'react';
import { makeStyles, Popper, Paper, MenuList, MenuItem, Grow} from '@material-ui/core';

const NotificationStyles = makeStyles({
    root:{
     width: "20%"
    }
});

const HeaderNotificationDropDown = ({ dropDownData, notificationAnchorEl, isOpen }) => {
    const classes = NotificationStyles();

    console.log('notification HD', dropDownData);
    return(
        <Popper anchorEl={notificationAnchorEl} open={isOpen} >
            <Paper>
              <MenuList>
                  <MenuItem> Peter likes your post </MenuItem>
                  <MenuItem> Charles has reponded to you </MenuItem>
              </MenuList>
            </Paper>
        </Popper>
    );
}

export default HeaderNotificationDropDown;