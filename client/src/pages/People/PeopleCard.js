import React from "react";
import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";

const peopleCardStyles = makeStyles({
  container: {
    display: "flex",
    height: 290,
    width: 190,
    flexDirection: "column",
    alignItems: "center",
  },
});

const PeopleCard = () => {
  const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
  const classes = peopleCardStyles();

  return (
    <Box className={classes.container}>
      <Paper>
        <Box>
          <img src={avatar} />
        </Box>
        <Box>
          <Typography> Alex Xavier </Typography>
          <Button> FOllow </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PeopleCard;
