import React from 'react';
import { useStore } from '../store';


const CreatePost = () => {
    const [{auth}] = useStore();
    console.log('AUTH: ',auth)

    // a form with text area, image selector and submit button
    return(
        <>
        <h4> CREATE POST </h4>
        </>
    )
}

export default CreatePost;