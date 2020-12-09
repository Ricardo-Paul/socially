import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { colors } from "@material-ui/core";

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
  },
  button: {
    color: palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    width: "100%",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0.1,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: palette.primary.main,
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
        {Icon && <Icon className={classes.icon} />}
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
