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
  navContainer: {
    paddingTop: 20,
    backgroundColor: colors.black, //match that color with layout extreme color
    [theme.breakpoints.up("sm")]: {
      //not for sm screen
      position: "fixed",
      width: "20%",
      left: "2%",
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
    width: "100%",
  },
}));

// partially set all routes to home
const Navigation = () => {
  const [{ auth }] = useStore();
  const styles = { color: colors.lighRed };
  const nameStyles = {
    backgroudcolor: colors.indigo9,
    color: colors.lighRed,
    marginBottom: 15,
  };

  // set the user to local so we can access
  // its properties
  const [user, setUser] = useState({});
  useEffect(() => {
    if (auth.user) {
      setUser(auth.user);
    }
  }, [auth]);

  const classes = navStyles();

  const options = [
    { title: "Home", icon: <HomeIcon />, to: Routes.HOME },
    { title: "Browse Feed", icon: <WebIcon />, to: Routes.HOME },
    { title: "People", icon: <PeopleIcon />, to: Routes.HOME },
    {
      title: "Notifications",
      icon: <NotificationsActiveIcon />,
      to: Routes.HOME,
    },
    { title: "Messages", icon: <MessageIcon />, to: Routes.HOME },
    { title: "About", icon: <InfoIcon />, to: Routes.HOME },
  ];
  const list = options.map((item, index) => {
    return (
      <NavLink
        to={item.to}
        style={{ textDecoration: "none", color: colors.white }}
      >
        <ListItem key={index} className={classes.listItem}>
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
              <Typography variant="h4" style={nameStyles}>
                <ListItemText primary={user.fullName} />
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
