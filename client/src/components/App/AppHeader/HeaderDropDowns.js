import React from 'react';
import HeaderNotificationDropDown from './HeaderNotificationDropDown';


/**
 * identify what dropdown is open and render it
 * 
 * @param {string} dropDownOpen
 * @param {array}  dropDownData
 */
const HeaderDropDowns = ({ dropDownOpen, dropDownData, notificationAnchorEl, isOpen }) => {

    const DropDowns = {
        NOTIFICATION: <HeaderNotificationDropDown dropDownData={dropDownData} notificationAnchorEl={notificationAnchorEl} isOpen={isOpen} />
    };
    return dropDownOpen ? DropDowns[dropDownOpen] : null
}

export default HeaderDropDowns;