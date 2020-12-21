import React from "react";
import { List, Typography, makeStyles, Box, Avatar } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";
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
import NavItem from "./NavItem";

const navStyles = makeStyles((theme) => ({
  name: {
    fontWeight: 500,
    fontSize: 16,
    fontFamily: "roboto",
  },
  avatar: {
    width: 64,
    height: 64,
    cursor: "pointer",
  },
}));

const Navigation = () => {
  const classes = navStyles();
  const [{ auth }] = useStore();

  const options = [
    { title: "Home", icon: HomeIcon, to: Routes.HOME },
    { title: "Browse Feed", icon: WebIcon, to: Routes.BROWSE },
    { title: "People", icon: PeopleIcon, to: Routes.PEOPLE },
    {
      title: "Notifications",
      icon: NotificationsActiveIcon,
      to: Routes.NOTIFICATIONS,
    },
    { title: "Messages", icon: MessageIcon, to: Routes.MESSAGE },
    { title: "About", icon: InfoIcon, to: Routes.ABOUT },
  ];

  const list = options.map((item, index) => (
    <NavItem key={index} icon={item.icon} title={item.title} href={item.to} />
  ));

  return (
    <>
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Avatar
            src={auth.user? auth.user.image:null}
            component={RouterLink}
            className={classes.avatar}
            to={Routes.HOME}
          />
          <Typography
            variant="primary"
            color="textPrimary"
            variant="h6"
            className={classes.name}
          >
            {auth.user? auth.user.fullName: null}
          </Typography>
          <Typography color="textSecondary">Software Developer</Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <List>{list}</List>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
