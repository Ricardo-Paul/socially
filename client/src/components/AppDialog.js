import React from "react";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    appBar: {
        marginBottom: 10
    },
    exit: {
        position: "absolute",
        top: 5,
        left: 5,
        backgroundColor: theme.palette.custom.palette.thirdColor,
        color: theme.palette.custom.palette.thirdColorText,
    }
}))

const AppDialog = ({ children, open, onClose }) => { 
    const classes = useStyles();

    return(
        <Dialog fullScreen open={open} onClose={onClose} >
                <IconButton className={classes.exit}>
                    <CloseIcon />
                </IconButton>
            {children}
        </Dialog>
    )
};

export default AppDialog;