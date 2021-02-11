import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { IconWrapper } from "../IconWrapper";

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
    width: "100%",
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
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
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
