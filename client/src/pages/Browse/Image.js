import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    image_container: {
        width: "100%"
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
}))

const Image = ({ image }) => {
    const classes = useStyles();
  return(
    <Box className={classes.image_container}>
      <img alt="image" src={image} className={classes.image} />
    </Box>
  )
};

export default Image;
