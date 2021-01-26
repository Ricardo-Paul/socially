import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  makeStyles,
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
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles(theme => ({
  badge: {
    backgroundColor: "#ff0000",
    color: "#ffffff",
    fontSize: ".8rem"
  }
}))

const AppHeader = () => {
  const classes = headerStyles();
  const badge_override = useStyles();
  const theme = useTheme();
  const [{ auth }] = useStore();

  const [notifications, setNotifications] = React.useState(null);
  const [conversations, setConversations] = React.useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownData, setDropDownData] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(null);

  React.useEffect(() => {
    if (auth.user != null) {
      setNotifications(auth.user.notifications);
      setConversations(auth.user.conversations);
    }
  }, [auth.user]);

  const openDropDown = (event) =>
    setAnchorEl(
      anchorEl && anchorEl.contains(event.target) ? null : event.currentTarget
    );

  const closeDropDown = () => {
    setAnchorEl(null);
  };

  const handleIconClick = (event, dropdownType) => {
    if (dropdownType === "MESSAGE") {
      setDropDownData(conversations);
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
          {/* partial styling */}
          <Typography variant="h6">
            <Box style={{
              backgroundColor: "#333333",
              color: "#d44b21",
              fontWeight: 600,
              borderRadius: "1rem",
              padding: ".35rem"
            }} >
              {AppInfo.name}
            </Box>
          </Typography>
          <Search
            fullWidth={false}
            placeholder="Search users..."
            style={{ marginLeft: 20 }}
          />
          <div className={classes.grow} />

          {/* Right Side */}
          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "NOTIFICATION")}
          >
            <Badge max={10} classes={{ badge: badge_override.badge }}  badgeContent={notifications ? notifications.length : null} color="secondary">
              <NotificationIcon style={{color: "white"}} fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "MESSAGE")}
          > 
            <Badge max={10} badgeContent={conversations.length } classes={{ badge: badge_override.badge }} >
              <MailIcon style={{color: "white"}} fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(event) => handleIconClick(event, "USER")}
          >
            <AccountCircle style={{color: "white"}} />
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
