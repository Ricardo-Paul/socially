import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  container: {
      color: theme.palette.primary.contrastText,
      padding: ".5rem",
      borderRadius:".5rem",
      border: theme.palette.custom.border,
      width: "100%"
    }
}))
const HelperMessages = ({ text, style }) => {
    const classes = useStyles();
    return(
        <Box className={classes.container} style={style}>
            {text}
        </Box>
    )
}

export default HelperMessages;