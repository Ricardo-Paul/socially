import React from 'react';
import HeaderMessageDropDown from './HeaderMessageDropDown';
import HeaderNotificationDropDown from './HeaderNotificationDropDown';
import HeaderUserDropDown from './HeaderUserDropDown';

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
    userAnchorEl }) => {
        
    const DropDowns = {
        NOTIFICATION: <HeaderNotificationDropDown dropDownData={dropDownData} notificationAnchorEl={notificationAnchorEl} isOpen={isOpen} />,
        MESSAGE: <HeaderMessageDropDown isOpen={isOpen} messageAnchorEl={messageAnchorEl} />,
        USER: <HeaderUserDropDown isOpen={isOpen} userAnchorEl={userAnchorEl} />

    };
    return dropDownOpen ? DropDowns[dropDownOpen] : null
}

export default HeaderDropDowns;