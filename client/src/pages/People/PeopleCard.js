import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import Proptypes from 'prop-types';
import Follow from "../../components/Follow";
const peopleCardStyles = makeStyles({
  container: {
    display: "flex",
    height: 290,
    width: 190,
    flexDirection: "column",
    alignItems: "center",
    padding: 5
  },
});

const PeopleCard = ({ user }) => {
  const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
  const classes = peopleCardStyles();

  return (
    <Box className={classes.container}>
      <Paper>
        <Box>
          <img src={avatar} />
        </Box>
        <Box>
          <Typography> {user.fullName} </Typography>
          <Typography> @{user.username} </Typography>
          <Follow user={user} />
        </Box>
      </Paper>
    </Box>
  );
};

PeopleCard.propTypes = {
  user: Proptypes.object.isRequired
}

export default PeopleCard;
