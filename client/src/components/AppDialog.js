import React from "react";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    appBar: {
        marginBottom: 10
    }
})

const AppDialog = ({ children, open, onClose }) => {
    const classes = useStyles();

    return(
        <Dialog fullScreen open={open} onClose={onClose} >
            <AppBar position="relative" style={{backgroundColor:"#fffefe"}} classes={classes.appBar} >
                <ToolBar>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </ToolBar>
            </AppBar>
            {children}
        </Dialog>
    )
};

export default AppDialog;