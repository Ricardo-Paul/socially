import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import Proptypes from "prop-types";
import Follow from "../../components/Follow";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";

const peopleCardStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginRight: 10,
    border: "1px solid #c5c4c4",
    borderRadius: 0,
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
  },
});

const PeopleCard = ({ user }) => {
  const classes = peopleCardStyles();

  return (
    <Paper className={classes.container} elevation={2}>
      <Box>
        <img src={user.image || defaultAvatar} className={classes.avatar} />
      </Box>
      <Box className={classes.cardInfo}>
        <Typography> {user.fullName} </Typography>
        <Typography style={{ marginBottom: 10 }} color="textSecondary">
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
