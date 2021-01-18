import React from "react"
import { generatePath, NavLink } from "react-router-dom";
import * as Routes from "./../routes";
import { Avatar, Box, Typography, makeStyles } from "@material-ui/core";
import { useStore } from "../store";
import PropTypes from "prop-types";

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
      backgroundColor: "#ceced0",
    },
    user: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
      textDecoration: "none",
      alignItems: "center",
      padding: 5,
      color: "#424242",
    },
    notSeen: {
      backgroundColor: "#4f60da",
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



const MessageCard = ({ user }) => {
    const classes = useStyles();
    const [{ auth }] = useStore();

    return(
        <NavLink
        className={classes.user}
        activeClassName={classes.selected}
        to={generatePath(Routes.MESSAGE, {
          id: user.id,
        })} 
      >
        <Avatar style={{ marginRight: 10 }} src={user.image} />
        <Box style={{ width: "100%" }}>
          <Box className={classes.info}>
            <Typography> {user.fullName}</Typography>
            <div className={classes.notSeen}></div>
          </Box>
          <Typography color="secondary">
            {" "}
            {user.lastMessage.substring(0, 8)} ...{" "}
          </Typography>
        </Box>
      </NavLink>
    )
};

MessageCard.propTypes = {
    user: PropTypes.object.isRequired
}

export default MessageCard;