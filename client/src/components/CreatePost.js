import {  Button, IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useStore } from '../store';
import { AccountCircle, AddAPhoto } from '@material-ui/icons';

// mutation
import { CREATE_POST } from '../graphql/post';
import { useMutation } from '@apollo/client'


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
    const [{auth}] = useStore();
    const classes = postStyles();

    const [createPost, { loading, data, error }] = useMutation(CREATE_POST);

    const handleChange = (e) => {
        setTitle(e.target.value);
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
                <IconButton className={classes.uploadIcon}>
                    <AddAPhoto />
                </IconButton>
            </div>
            <Button color="primary" type="submit">
                CREATE POST
            </Button>
        </form>
        </>
    )
}
export default CreatePost;