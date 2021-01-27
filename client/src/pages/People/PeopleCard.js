import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import Proptypes from "prop-types";
import Follow from "../../components/Follow";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";
import { generatePath, Link } from "react-router-dom";
import * as Routes from "../../routes";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    marginRight: 10,
    // border: "1px solid #c5c4c4",
    borderRadius: 0,
    // boxShadow: theme.palette.custom.boxShadow
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    objectFit: "cover",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: theme.palette.primary.contrastText
  },
}));

const PeopleCard = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} elevation={2}>
      <Box
        component={Link}
        to={generatePath(Routes.PROFILE, {
          username: user.username,
        })}
      >
        <img src={user.image || defaultAvatar} className={classes.avatar} />
      </Box>
      <Box className={classes.cardInfo}>
        <Typography> {user.fullName} </Typography>
        <Typography style={{ marginBottom: 10 }}>
          {" "}
          @{user.username}{" "}
        </Typography>
        <Follow user={user} />
      </Box>
    </Paper>
  );
};

PeopleCard.propTypes = {
  user: Proptypes.object.isRequired,
};

export default PeopleCard;
