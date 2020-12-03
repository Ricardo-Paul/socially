import React from 'react';
import { 
    makeStyles, 
    Popper, 
    Paper, 
    MenuList, 
    MenuItem, 
    Grow} from '@material-ui/core';
import headerStyles from './headerStyles';



const HeaderNotificationDropDown = ({ dropDownData, notificationAnchorEl, isOpen }) => {
    const classes = headerStyles();

    console.log('notification HD', dropDownData);
    return(
        <Popper anchorEl={notificationAnchorEl} open={isOpen} transition disablePortal className={classes.popper} >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: placement === "bottom"? "center top": "center bottom"
                }}
                >
                    <Paper elevation={5}>
                        <MenuList>
                            <MenuItem> Peter likes your post </MenuItem>
                            <MenuItem> Jake likes your post </MenuItem>
                            <MenuItem> Jane commented on yout post </MenuItem>
                        </MenuList>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default HeaderNotificationDropDown;