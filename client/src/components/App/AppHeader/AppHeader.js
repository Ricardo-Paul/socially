import {
  AppBar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Badge
} from "@material-ui/core";

import { Notifications as NotificationIcon } from '@material-ui/icons';

import React, { useState } from "react";
import AppInfo from "../../../constants/AppInfo.json";
import headerStyles from "./headerStyles";
import MenuIcon from "@material-ui/icons/Menu";

// components
import Search from "./Search";
import Message from "./Message";
import User from "./user";
import Navigation from "../Navigation";
import { useStore } from "../../../store";
import HeaderDropDowns from "./HeaderDropDowns";


const AppHeader = () => {
  const classes = headerStyles();
  const [{auth}] = useStore();

  const [notifications, setNotifications] = React.useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownData, setDropDownData] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(null);

    React.useEffect(() => {
      if(auth.user != null){
        setNotifications(auth.user.notifications);
      }
    }, [auth]);
  

    const handleIconClick = (event, dropdownType) => {
      setAnchorEl(anchorEl && anchorEl.contains(event.target) ? null : event.currentTarget );

      switch(dropdownType){
        case 'NOTIFICATION':{
          setDropDownData(notifications);
          setDropDownOpen(dropdownType); //tells HeaderDropDowns which one to return
        }
      };
    }

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="secondary"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={classes.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.appName}>
            {AppInfo.name}
          </Typography>
          <Search />
          <div className={classes.grow} />

          {/* Right Side */}
          <IconButton color="inherit" onClick={(event) => handleIconClick(event, 'NOTIFICATION')}>
            <Badge badgeContent={notifications.length} color="secondary">
                <NotificationIcon fontSize="small" />
            </Badge>
          </IconButton>
          <Message />
          <User />

        </Toolbar>
      </AppBar>

      <HeaderDropDowns 
      dropDownOpen={dropDownOpen}
      dropDownData={dropDownData}
      notificationAnchorEl={anchorEl}
      isOpen={Boolean(anchorEl)}
      />
      
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Navigation />
      </Drawer>

    </>
  );
};

export default AppHeader;
