import { AppBar, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AppInfo from '../../../constants/AppInfo.json';
import headerStyles from './headerStyles';

// Menu
import MenuIcon from '@material-ui/icons/Menu';

// components
import Search from './Search';
import Message from './Message';
import Notification from './Notification';
import User from './user';
import Navigation from '../Navigation';

const AppHeader = () => {
    const classes = headerStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // isMenuOpen relies on the anchorEl
    // we set the current target of the user icon button as the anchor El
    const [ anchorEl, setAnchorEl ] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const openProfileMenu = (event) => {
        setAnchorEl(event.currentTarget); // turns it to true
    }

    const CloseProfileMenu = () => {
        setAnchorEl(null);
    }

    const renderMenu = (
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={CloseProfileMenu} >
            <MenuItem onClick={CloseProfileMenu}> Profile </MenuItem>
            <MenuItem onClick={CloseProfileMenu}> My Account </MenuItem>
        </Menu>
    )

    return(
        <>
         <AppBar position="sticky" className={classes.appBar}>
           <Toolbar className={classes.toolBar}>
               <IconButton color="secondary" onClick={()=> setIsDrawerOpen(!isDrawerOpen)} className={classes.menuIcon}>
                   <MenuIcon />
               </IconButton>
               <Typography variant="h6" className={classes.appName}>
                   {AppInfo.name}
               </Typography>
                <Search />
                <div className={classes.grow} />
                <Notification />
                <Message />
                <User openProfileMenu={openProfileMenu} />
           </Toolbar>
       </AppBar>
       {renderMenu}
       <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
        <Navigation />
       </Drawer>
    </>
    )
}

export default AppHeader;