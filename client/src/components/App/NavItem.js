import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { colors } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { IconWrapper } from "../IconWrapper";

// temporary palette
const palette = {
  background: {
    dark: "#F4F6F8",
    default: colors.common.white,
    paper: colors.common.white,
  },
  primary: {
    main: colors.indigo[500],
  },
  secondary: {
    main: colors.indigo[500],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
  },
};

const navItemStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover":{
      backgroundColor: theme.palette.primary.light
    }
  },
  button: {
    color: theme.palette.primary.contrastText,
    fontWeight: 400,
    width: "100%",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0.1,
  },
  icon_container: {
    backgroundColor: "red"
  },
  icon: {

  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: "#fdfdfd",
    backgroundColor: "#505050",
  },
}));

const NavItem = ({ icon: Icon, title, href, className, ...rest }) => {
  const classes = navItemStyles();

  return (
    <ListItem
      disableGutters
      className={clsx(classes.item, className)}
      {...rest}
    >
      <Button
        component={RouterLink} // notice NavLink (RouterLink) is the component
        to={href}
        className={classes.button}
        activeClassName={classes.active}
      >
        <IconWrapper>
          {Icon && <Icon className={classes.icon} />}
        </IconWrapper>
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default NavItem;
