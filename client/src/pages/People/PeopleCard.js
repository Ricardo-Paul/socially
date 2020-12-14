import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import Proptypes from 'prop-types';
import Follow from "../../components/Follow";
const peopleCardStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 20
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: "50%"
  }
});

const PeopleCard = ({ user }) => {
  const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
  const classes = peopleCardStyles();

  return (
      <Paper className={classes.container}>
        <Box>
          <img src={avatar} className={classes.avatar} />
        </Box>
        <Box>
          <Typography> {user.fullName} </Typography>
          <Typography> @{user.username} </Typography>
          <Follow user={user} />
        </Box>
      </Paper>
  );
};

PeopleCard.propTypes = {
  user: Proptypes.object.isRequired
}

export default PeopleCard;
