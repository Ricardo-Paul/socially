import React from 'react';
import { ThumbUpAlt } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import { useStore } from './../store';
import { CREATE_LIKE, DELETE_LIKE } from './../graphql/like';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

const Like = ({ likes, postId }) => {
    // decide what operation to execute
    // based on whether the current user has liked
    // the post

    const [{auth}] = useStore();
    const existedLike = likes.find(like => like.user === auth.user.id);
    const operation = existedLike ? 'delete' : 'create';

    const options = {
        create:{
            mutation: CREATE_LIKE,
            variables: {postId, userId: auth.user.id}
        },
        delete:{
            mutation: DELETE_LIKE,
            variables: {likeId: existedLike ? existedLike.id : null}
        }
    }

    const [mutate] = useMutation(options[operation].mutation,{
        refetchQueries: []
    })

    const handleButtonClick = async () => {
        try{
            const {data} = await mutate({
                variables: { input: { ...options[operation].variables } }
            });

            console.log('LIKE RESULT', existedLike, data);
        } catch(err){
            console.log(err)
        }
    };

    return(
        <IconButton onClick={() => handleButtonClick(mutate)}>
            <ThumbUpAlt />
        </IconButton>
    )
}

export default Like;

Like.propTypes = {
    likes: PropTypes.array.isRequired, 
    postId: PropTypes.string.isRequired
}