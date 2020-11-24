import {  Button, IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useStore } from '../store';
import { AccountCircle } from '@material-ui/icons';
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSizeLimit'

// mutation
import { CREATE_POST } from '../graphql/post';
import { useMutation } from '@apollo/client'
import UploadPostImage from './UploadPostImage';

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
    const [title, setTitle] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [{auth}] = useStore();
    const classes = postStyles();

    const [createPost, { loading, data, error }] = useMutation(CREATE_POST);

    // title change
    const handleChange = (e) => setTitle(e.target.value);

    // image change
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file){
            return
        };
        alert(file.size);
        if(file.size >= MAX_POST_IMAGE_SIZE){
            setUploadError(`Image is size should not exceed ${ MAX_POST_IMAGE_SIZE/1000000 } mb`);
        }
        // TODO: make sure file size is not higher than it should be
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await createPost({
                variables:{ input: { title, authorId: auth.user.id } }
            })
            console.log(res);
        } catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={(e) => handleSubmit(e, createPost)}>
        <h4> CREATE POST </h4>
            <div className={classes.container}>
                <div className={classes.avatar}>
                    <AccountCircle />
                </div>
                <textarea 
                className={classes.textarea}
                placeholder="What's on your mind..."
                value={title}
                onChange={handleChange}
                />
                {/* fix upload icon styles later */}
                <div className={classes.uploadIcon}> 
                     <UploadPostImage handleImageChange={handleImageChange} />
                </div>
            </div>
            <Button color="primary" type="submit">
                CREATE POST
            </Button>
        </form>
        </>
    )
}
export default CreatePost;