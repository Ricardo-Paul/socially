import React from "react";
import { withRouter } from "react-router-dom";
import PostPopUp from "../../components/PostPopUp";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";


const Post = ({ match }) => {
    const postId = match.params.id;

    return (
        <PostPopUp id={postId} />
    )
}

export default withRouter(Post);