import React from 'react';
import { ThumbUpAlt } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import { useStore } from './../store';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { HOME_PAGE_POSTS_LIMIT } from './../constants/DataLimit';

// mutation
import { CREATE_LIKE, DELETE_LIKE } from './../graphql/like';

// queries to refetch
import { GET_AUTH_USER } from "./../graphql/user";
import { GET_FOLLOWED_POSTS } from "./../graphql/post";
import useNotification from '../hooks/useNotification';

const Like = ({ likes, postId, author }) => {
    // decide what operation to execute
    // based on whether the current user has liked
    // the post
    const [likeId, setLikeId] = React.useState('');

    const notification = useNotification();

    const [{auth}] = useStore();
    const existedLike = likes.find(like => like.user === auth.user.id);


    const operation = existedLike ? 'delete' : 'create';

    const options = {
        create:{
            mutation: CREATE_LIKE,
            variables: {postId, userId: auth.user.id} //notice variables value is an object
        },
        delete:{
            mutation: DELETE_LIKE,
            variables: {likeId: existedLike ? existedLike.id : null}
        }
    }

    const [mutate] = useMutation(options[operation].mutation,{
        // TODO: also refetch the user posts
        refetchQueries: [
            {query: GET_AUTH_USER},
            {query: GET_FOLLOWED_POSTS, variables:{ userId: auth.user.id, limit: HOME_PAGE_POSTS_LIMIT }}
        ]
    })

    const handleButtonClick = async () => {
        try{
            const { data } = await mutate({
                variables: { input: { ...options[operation].variables } } // spread the variables object
            });

        } catch(err){
            console.log(err)
        }
    };

    return(
        <IconButton onClick={() => handleButtonClick(mutate)}>
            <ThumbUpAlt color={existedLike?'primary':'secondary'} />
        </IconButton>
    )
}

export default Like;

Like.propTypes = {
    likes: PropTypes.array.isRequired, 
    postId: PropTypes.string.isRequired,
    author: PropTypes.object
}

// db.users.update({username:'mrjoe'}, {$set: {likes: []}})