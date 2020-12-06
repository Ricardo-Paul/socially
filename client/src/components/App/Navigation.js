import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  CssBaseline,
  Box,
  Avatar,
} from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import * as Routes from "../../routes";
import { useStore } from "../../store";
import Divider from "@material-ui/core/Divider";


// icons
import HomeIcon from "@material-ui/icons/Home";
import WebIcon from "@material-ui/icons/Web";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MessageIcon from "@material-ui/icons/Message";
import InfoIcon from "@material-ui/icons/Info";

import { colors, shadows } from "../../utils/theme";

const navStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: colors.lighRed,
  },
  navContainer: {
    marginTop: 5,
    paddingTop: 20,
    backgroundColor: colors.black, //match that color with layout extreme color
    [theme.breakpoints.up("sm")]: {
      //not for sm screen
      position: "absolute",
      width: "70%", //related to the left grid
      right: "1%",
    },
  },
  list: {
    // these styles are enabled for small screen
    // all the way up.. not for xs
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      paddingLeft: 40,
      // boxShadow: shadows.md,
      padding: 15,
    },
  },
  listItem: {
    color: colors.white,
    width: "100%",
    display:"flex",
    "&:hover":{
      backgroundColor: colors.indigo1
    }
  },
  name: {
    fontWeight: 500,
    fontSize: 16,
    fontFamily: "roboto"
  },
  avatar:{
    width: 64,
    height: 64,
    cursor: "pointer"
  }
}));

// partially set all routes to home
const Navigation = () => {
  const [{ auth }] = useStore();
  const styles = { color: colors.indigo0 };


  // set the user to local so we can access
  // its properties
  const [user, setUser] = useState({});
  useEffect(() => {
    if (auth.user) {
      setUser(auth.user);
    }
  }, [auth.user]);

  const classes = navStyles();
  const [location, setLocation] = useState(null); //hack to style the selected link

  const avatar = "https://material-ui.com/static/images/avatar/2.jpg"

  const options = [
    { title: "Home", icon: <HomeIcon />, to: Routes.HOME },
    { title: "Browse Feed", icon: <WebIcon />, to: Routes.BROWSE },
    { title: "People", icon: <PeopleIcon />, to: Routes.PEOPLE },
    {
      title: "Notifications",
      icon: <NotificationsActiveIcon />,
      to: Routes.NOTIFICATIONS,
    },
    { title: "Messages", icon: <MessageIcon />, to: Routes.MESSAGE },
    { title: "About", icon: <InfoIcon />, to: Routes.ABOUT },
  ];
  const list = options.map((item, index) => {
    return (
      <NavLink
        key={index}
        exact
        to={item.to}
        style={{ textDecoration: "none", color: colors.white }}
      >
        <ListItem 
        key={index} 
        className={item.to === location?classes.selected : classes.listItem}
        >
          <ListItemIcon style={styles}> {item.icon} </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      </NavLink>
    );
  });

  return (
    <>
      <CssBaseline />
      <Box
      bgcolor="palevioletred"
      height="100%"
      display="flex"
      flexDirection="column"
      >
        <Box 
        bgcolor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        >
          <Avatar 
          src={avatar}
          component={Link}
          className={classes.avatar}
          />
          <Typography
          variant="primary"
          color="textPrimary"
          variant="h6"
          className={classes.name}
          >
            Alex Xavier
          </Typography>
          <Typography
          color="textSecondary"
          >
            Software Developer
          </Typography>
        </Box>
        <Divider />
        <Box
        bgcolor="white"
        >
          <List>
            <ListItem> Browse </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
