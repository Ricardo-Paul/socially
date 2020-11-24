import React from 'react';
import { makeStyles } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';
import { colors } from '../utils/theme';


const inputStyles = makeStyles({
    input:{
        display:"none"
    },
    avatar:{
        color: colors.white,
        backgroundColor: colors.indigo4,
        width: 50,
        height: 50,
        borderRadius: "50%",
        padding: 15
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
             <IconButton onClick={triggerClick} >
                <AddAPhoto className={classes.avatar}/>
             </IconButton>
         </label>
        </>
    )
}

export default UploadPostImage;