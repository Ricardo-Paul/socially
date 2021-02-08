import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    progress: {
        color: theme.palette.primary.contrastText
    }
}))

const LoadingIndicator =({ style }) => {
    const classes = useStyles();
    return(
        <CircularProgress
        style={style}
        variant="indeterminate" 
        className={classes.progress}
        />
    )
}

export default LoadingIndicator;