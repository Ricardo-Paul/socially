import React, { Fragment } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const PostStyles = makeStyles({
    root:{
        zIndex: 900,
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        position: "absolute",
    },
})

const PostPopUp = ({ closeModal }) => {

    const classes = PostStyles();
    return(
        <div className={classes.root}>
            <Button onClick={closeModal} color="primary" variant="contained">
                Close
            </Button>
        </div>
    )
}

export default PostPopUp;

PostPopUp.propTypes = {
    closeModal: PropTypes.func.isRequired
}