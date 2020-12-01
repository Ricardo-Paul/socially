import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
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
import { AccountCircle } from "@material-ui/icons";

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
    color: colors.indigo0,
    fontWeight: "bold",
    fontSize: 10
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
  }, [auth]);

  const classes = navStyles();
  const [location, setLocation] = useState(null); //hack to style the selected link

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
        isActive={(location) => { //grab the location url, helps us identify the current url
          if(location){
            setLocation(location.url)
          }
        }}
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
      <div className={classes.navContainer}>
        <List className={classes.list}>
          <div className={classes.fixList}>
            <ListItem>
              <ListItemIcon style={styles}>
                {" "}
                <AccountCircle />{" "}
              </ListItemIcon>
              <Typography variant="h4">
                <ListItemText className={classes.name} primary={user.fullName} />
              </Typography>
            </ListItem>
            <Divider />
            {list}
          </div>
        </List>
      </div>
    </>
  );
};

export default Navigation;
