import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import PostPopUp from "../../components/PostPopUp";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/post";
import AppDialog from "../../components/AppDialog";
import * as Routes from "./../../routes"


const Post = ({ match, history }) => {
    const postId = match.params.id;
    const [ dialogOpen, setDialogOpen ] = React.useState(null);

    React.useEffect(() => {
        if(postId){
            setDialogOpen(true);
            window.history.pushState("", "", generatePath(Routes.POST, {
                id: postId
            }))
        };
    }, [postId]);

    const closeDialog = () => {
        setDialogOpen(false);
        history.push(Routes.NOTIFICATIONS)
    }

    return (
        <AppDialog open={dialogOpen} onClose={closeDialog}>
            <PostPopUp closeModal={closeDialog} id={postId} />
        </AppDialog>
    )
}

export default withRouter(Post);