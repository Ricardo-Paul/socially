import React from 'react';
import { 
    makeStyles, 
    Popper, 
    Paper, 
    MenuList, 
    MenuItem, 
    Grow} from '@material-ui/core';
import headerStyles from './headerStyles';
import MenuWrapper from './MenuWrapper';


const HeaderNotificationDropDown = ({ dropDownData, notificationAnchorEl, isOpen, closeMenu }) => {

    console.log('notification HD', dropDownData);
    return(
        <MenuWrapper isOpen={isOpen} anchorEl={notificationAnchorEl} closeMenu={closeMenu}>
            <MenuList>
                <MenuItem> Peter likes your post </MenuItem>
                <MenuItem> Jake likes your post </MenuItem>
                <MenuItem> Jane commented on yout post </MenuItem>
            </MenuList>
        </MenuWrapper>
    );
}

export default HeaderNotificationDropDown;