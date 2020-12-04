import React from 'react';
import { 
    List
 } from '@material-ui/core';

import MenuWrapper from './MenuWrapper';
import Notification from '../Notification';

const HeaderNotificationDropDown = ({ dropDownData, notificationAnchorEl, isOpen, closeMenu }) => {

    console.log('notification HD', dropDownData);
    let notifications = dropDownData;
    return(
        <MenuWrapper isOpen={isOpen} anchorEl={notificationAnchorEl} closeMenu={closeMenu}>
            <List>
                { notifications.map((n) => <Notification key={n.id} notification={n} />) }
            </List>
        </MenuWrapper>
    );
}

export default HeaderNotificationDropDown;