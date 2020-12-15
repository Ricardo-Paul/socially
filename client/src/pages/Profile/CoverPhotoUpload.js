import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import defaultCover from './background.jpg'

const CoverStyles = makeStyles(theme => ({
    background: {
        height: 350,
        width: "100%"
    }
}))

const CoverPhotoUpload = () => {
    const classes = CoverStyles();

    return(
        <Box className={classes.background}>
            USER CoverPhotoUpload
        </Box>
    )
}

export default CoverPhotoUpload;