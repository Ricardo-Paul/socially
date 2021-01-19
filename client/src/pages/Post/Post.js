import React from "react";
import { withRouter } from "react-router-dom";
import PostPopUp from "../../components/PostPopUp";


const Post = ({ match }) => {
    const postId = match.params.id;
    return (
        <PostPopUp />
    )
}

export default withRouter(Post);