import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    progress: {
        color: theme.palette.primary.contrastText
    }
}))

const LoadingIndicator =() => {
    const classes = useStyles();
    return(
        <CircularProgress
        variant="indeterminate" 
        className={classes.progress}
        />
    )
}

export default LoadingIndicator;