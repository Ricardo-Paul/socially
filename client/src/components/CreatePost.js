import {  Container, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import { useStore } from '../store';
import { AccountCircle, AddAPhoto } from '@material-ui/icons';

const postStyles = makeStyles(theme => ({
    container:{
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between"
    },
    avatar:{
        padding: 5,
        color: "white"
    },
    textarea:{
        marginLeft: 10,
        marginRight: 10,
        width: "100%",
        height: 40,
        outline: "none",
        border: 0,
        paddingTop: 10,
        paddingLeft: 15,
        borderRadius: 5
    },
    uploadIcon:{
        padding: 5,
        color: "white"
    }
}))

const CreatePost = () => {
    const [{auth}] = useStore();
    const classes = postStyles();

    // a form with text area, image selector and submit button
    return(
        <>
        <form>
        <h4> CREATE POST </h4>
            <div className={classes.container}>
                <div className={classes.avatar}>
                    <AccountCircle />
                </div>
                <textarea 
                className={classes.textarea}
                placeholder="What's on your mind..."
                />
                <IconButton className={classes.uploadIcon}>
                    <AddAPhoto />
                </IconButton>
            </div>
        </form>
        </>
    )
}

export default CreatePost;