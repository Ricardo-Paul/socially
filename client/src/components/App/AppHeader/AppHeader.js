import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  makeStyles,
  Grid,
  Hidden,
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
import { IconWrapper } from "../../IconWrapper";
import { PageContainer } from "../../pageContainer";

const useStyles = makeStyles(theme => ({
  badge: {
    backgroundColor: "#ff0000",
    color: "#ffffff",
    fontSize: ".8rem"
  },
  icon_button: {
    margin: ".2rem",
    color: theme.palette.custom.palette.thirdColorText,
    [theme.breakpoints.down("sm")]:{
      padding: 0
    }
  },
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
      anchorEl && anchorEl.contains(event.currentTarget) ? null : event.currentTarget
    );

  const closeDropDown = () => {
    setAnchorEl(null);
  };

  const handleIconClick = async (event, dropdownType) => {
    if (dropdownType === "MESSAGE") {
      console.log('UNSEEN MESSAGES',conversations)
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
          <Grid item xl={10} lg={11} xs={12} className={classes.middle}>
            <PageContainer>
              <div className={classes.home}>
                <Grid container spacing={2} className={classes.grid}>
                  <Grid item md="8" lg="7" xs="12">
                    <Toolbar className={classes.toolBar}>
                    <IconButton
                color="secondary"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={classes.menuIcon}
                style={{paddingLeft: ".5rem"}}
                >
                  <MenuIcon />
                </IconButton>
                {/* partial styling */}
                  <Box style={{
                    borderRadius: "1rem",
                    padding: ".35rem"
                  }} className={classes.appName}
                  >
                    {AppInfo.name}
                  </Box>
                <Search
                  fullWidth={false}
                  placeholder="Search users..."
                  style={{ marginLeft: 20 }}
                />
                <div className={classes.grow} />

                {/* Right Side */}
                <IconButton classes={{ colorInherit: classes.icon_button }} color="inherit" onClick={(event) => handleIconClick(event, "NOTIFICATION")} style={{padding: ".3rem"}} >
                    <Badge max={10} classes={{ badge: badge_override.badge }}  badgeContent={notifications ? notifications.length : 10} color="secondary">
                        <NotificationIcon style={{color: "white"}} fontSize="small" />
                    </Badge>
                </IconButton>

                <IconButton classes={{ colorInherit: classes.icon_button }}  color="inherit" onClick={(event) => handleIconClick(event, "MESSAGE")} style={{padding: ".3rem"}} > 
                    <Badge max={10} badgeContent={conversations.length } classes={{ badge: badge_override.badge }} >
                      <MailIcon style={{color: "white"}} fontSize="small" />
                    </Badge>
                </IconButton>

                <IconButton className={classes.icon_button}  color="inherit" onClick={(event) => handleIconClick(event, "USER")} style={{padding: ".3rem"}}>
                    <AccountCircle style={{color: "white"}} />
                </IconButton>
                    </Toolbar>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md="4" lg="4" xs="12">
                      {/* <PeopleSuggestions /> */}
                    </Grid>
                  </Hidden>
                </Grid>
              </div>
            </PageContainer>
          </Grid>
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
      <Drawer classes={{ paper: classes.mobileDrawer }} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Navigation closeDrawer={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  );
};

export default AppHeader;
