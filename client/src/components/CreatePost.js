import {  Button, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useStore } from '../store';
import { AccountCircle } from '@material-ui/icons';
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSizeLimit'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// mutation
import { CREATE_POST } from '../graphql/post';
import { useMutation } from '@apollo/client'
import UploadPostImage from './UploadPostImage';
import ImagePreview from './ImagePreview'

import { colors, shadows } from '../utils/theme';

const postStyles = makeStyles(theme => ({
    container:{
        display: "flex",
        flexDirection:"column",
        backgroundColor: colors.indigo9,
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        boxShadow: shadows.sm
    },
    row1:{
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar:{
        padding: 5,
        color: colors.lighRed
    },
    textarea:{
        marginLeft: 10,
        marginRight: 10,
        width: "100%",
        height: 50,
        outline: "none",
        border: 0,
        paddingTop: 10,
        paddingLeft: 15,
        borderRadius: 5,
        backgroundColor: colors.indigo1
    },
    uploadIcon:{
        padding: 5,
        color: "white"
    },
    buttons:{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    }
}))

const CreatePost = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [{auth}] = useStore();
    const classes = postStyles();

    const [createPost, { loading, data, error }] = useMutation(CREATE_POST);
    const isUploadDisabled = loading || (!loading && !title && !image);

    // title change
    const handleChange = (e) => setTitle(e.target.value);

    const handleReset = () => {
        setIsFocused(false);
        setTitle("");
        setImage("");
    }

    // image change
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file){
            return
        };
        if(file.size >= MAX_POST_IMAGE_SIZE){
            setUploadError(`Image is size should not exceed ${ MAX_POST_IMAGE_SIZE/1000000 } mb`);
        };
        console.log(file);
        setImage(file);
    }

    const handleSubmit = async (e) => {
        if(!title && !image){
            return;
        }
        e.preventDefault();
        try{
            const res = await createPost({
                variables:{ input: { title, authorId: auth.user.id, image } }
            });
            console.log(res);
        } catch(error){
            console.log(error)
        };
        handleReset();
    }

    return(
        <>
        <form onSubmit={(e) => handleSubmit(e, createPost)}>
            <div className={classes.container}>
                <div className={classes.row1}>
                    <div className={classes.avatar}>
                        <AccountCircle fontSize="large" />
                    </div>

                    <textarea 
                    className={classes.textarea}
                    placeholder="What's on your mind..."
                    value={title}
                    onChange={handleChange}
                    focus={isFocused}
                    onFocus={()=>setIsFocused(true)}
                    />

                    <div className={classes.uploadIcon}> 
                        <UploadPostImage handleImageChange={handleImageChange} />
                    </div>
                </div>

                {image && <ImagePreview imageSource={URL.createObjectURL(image)} />}

                {isFocused &&
                    <div className={classes.buttons}>
                    <Button 
                    color="secondary"
                    size="small"  
                    onClick={handleReset} 
                    variant="outlined" >
                        {!title && !image?`CLOSE`:`CANCEL`}
                    </Button>
                    <Button 
                    color="secondary" 
                    size="small" 
                    startIcon={<CloudUploadIcon />} 
                    variant="contained" 
                    style={{marginLeft: 5}}
                    type="submit"
                    disabled={isUploadDisabled}
                    >
                        SHARE
                    </Button>
                </div>
                }

            </div>
        </form>
        </>
    )
}
export default CreatePost;