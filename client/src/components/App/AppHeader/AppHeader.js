import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@material-ui/core";

import {
  Notifications as NotificationIcon,
  AccountCircle,
  Mail as MailIcon,
} from "@material-ui/icons";

import React, { useState } from "react";
import AppInfo from "../../../constants/AppInfo.json";
import headerStyles from "./headerStyles";
import MenuIcon from "@material-ui/icons/Menu";
// components
import Navigation from "../Navigation";
import { useStore } from "../../../store";
import HeaderDropDowns from "./HeaderDropDowns";
import Search from "../../Search";

const AppHeader = () => {
  const classes = headerStyles();
  const [{ auth }] = useStore();

  const [notifications, setNotifications] = React.useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownData, setDropDownData] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(null);

  React.useEffect(() => {
    if (auth.user != null) {
      setNotifications(auth.user.notifications);
    }
  }, [auth]);

  const openDropDown = (event) =>
    setAnchorEl(
      anchorEl && anchorEl.contains(event.target) ? null : event.currentTarget
    );

  const closeDropDown = () => {
    setAnchorEl(null);
  };

  const handleIconClick = (event, dropdownType) => {
    if (dropdownType === "MESSAGE") {
      openDropDown(event);
    }
    if (dropdownType === "NOTIFICATION") {
      setDropDownData(notifications);
      setDropDownOpen(dropdownType);
      openDropDown(event);
    }
    if (dropdownType === "USER") {
      setDropDownOpen(dropdownType);
      openDropDown(event);
    }

    setDropDownOpen(dropdownType);
  };

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
          <Search fullWidth={false} placeholder="Search users..." style={{ marginLeft: 20}} />
          <div className={classes.grow} />

          {/* Right Side */}
          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "NOTIFICATION")}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationIcon color="primary" fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "MESSAGE")}
          >
            <Badge badgeContent={4} color="secondary">
              <MailIcon color="primary" fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "USER")}
          >
            <AccountCircle color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <HeaderDropDowns
        dropDownOpen={dropDownOpen}
        dropDownData={dropDownData}
        notificationAnchorEl={anchorEl}
        messageAnchorEl={anchorEl}
        userAnchorEl={anchorEl}
        isOpen={Boolean(anchorEl)}
        closeMenu={closeDropDown}
      />

      {/* mobile drawer */}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Navigation />
      </Drawer>
    </>
  );
};

export default AppHeader;
