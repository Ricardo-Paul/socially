import React from "react";
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "./../routes";
import { Avatar, Box, Typography, makeStyles } from "@material-ui/core";
import { useStore } from "../store";
import PropTypes from "prop-types";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "#cdcde0",
    width: 330,
    // height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#d0d0d0",
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    width: "90%",
  },
  selected: {
    backgroundColor: theme.palette.primary.light,
  },
  user: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    textDecoration: "none",
    alignItems: "center",
    padding: 5,
    borderRadius: ".5rem",
    color: "#424242",
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  notSeen: {
    backgroundColor: "#ce2803",
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginLeft: 15,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));

const MessageCard = ({ user, notSeen }) => {
  const classes = useStyles();
  const [{ auth }] = useStore();
  const theme = useTheme();
  const text_color = theme.palette.primary.contrastText;

  return (
    <NavLink
      className={classes.user}
      activeClassName={classes.selected}
      to={generatePath(Routes.MESSAGE, {
        id: user.id,
      })}
    >
      <Avatar style={{ marginRight: 10 }} src={user.image} />
      <Box style={{ width: "100%", color: text_color }}>
        <Box className={classes.info}>
          <span style={{fontWeight:"bold"}} > {user.fullName} </span>
          {notSeen ? <div className={classes.notSeen}></div> : null}
        </Box>
          {user.lastMessage.substring(0, 8)} ...{" "}
      </Box>
    </NavLink>
  );
};

MessageCard.propTypes = {
  user: PropTypes.object.isRequired,
  notSeen: PropTypes.bool,
};

export default MessageCard;
