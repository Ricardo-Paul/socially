import React from 'react';
import { makeStyles } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';
import { colors, theme } from '../utils/theme';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const inputStyles = makeStyles({
    input:{
        display:"none"
    },
    avatar:{
        color: colors.lighRed,
        backgroundColor: colors.indigo1,
        width: 50,
        height: 50,
        borderRadius: 5,
        padding: 15,
        [theme.breakpoints.down("sm")]: {
            padding: 3,
            margin:0,
            borderRadius:2,
        }
    }
})

const UploadPostImage = ({ handleImageChange }) => {
    const classes = inputStyles();
    const triggerClick = () => {
            document.getElementById("post-image").click();
    }

    return(
        <> 
         <input type="file" onChange={handleImageChange} accept="image/x-png,image/jpeg" id="post-image" className={classes.input} />
         <label htmlFor="post-image">
             <IconButton onClick={triggerClick} className={classes.avatar}>
                <PhotoCameraIcon />
             </IconButton>
         </label>
        </>
    )
}

export default UploadPostImage;