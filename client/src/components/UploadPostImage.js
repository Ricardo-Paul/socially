import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';


const inputStyles = makeStyles({
    input:{
        display:"none"
    }
})


const UploadPostImage = ({ handleImageChange }) => {
    const classes = inputStyles();
    const triggerClick = () => {
            document.getElementById("post-image").click();
    }

    return(
        <> 
         <input type="file" onChange={handleImageChange} id="post-image" className={classes.input} />
         <label htmlFor="post-image">
             <IconButton onClick={triggerClick} >
                <AddAPhoto />
             </IconButton>
         </label>
        </>
    )
}

export default UploadPostImage;