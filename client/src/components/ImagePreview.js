import React from 'react';
import { makeStyles } from '@material-ui/core';
import { colors, shadows } from '../utils/theme';


const previewStyles = makeStyles({
    container:{
        width:150,
        height:150,
        marginLeft: 10
    },
    image:{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        boxShadow: shadows.xl
    }
})

const ImagePreview = ({ imageSource }) => {
    const classes = previewStyles();

    return(
        <div className={classes.container}>
            <img src={imageSource} className={classes.image} />
        </div>
    )
}

export default ImagePreview;