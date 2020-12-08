import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import { CREATE_FOLLOW, DELETE_FOLLOW } from '../graphql/follow';
import { useStore } from '../store';


const Follow = ({ user }) => {
    const [{ auth }] = useStore();
    
    const isFollowing = user.followers.find(f => f.follower === auth.user.id);
    const operation = isFollowing?'delete':'create';

    console.log('FOLLOWING', user, isFollowing);

    const options = {
        create:{
            mutation: CREATE_FOLLOW,
            variables: {
                currentUserId: auth.user.id, // current user is the following
                followedUserId: user.id //follwed user (follower)
            }
        },
        delete:{
            mutation: DELETE_FOLLOW,
            variables: {
                followId: isFollowing ? isFollowing.id : null
            }
        }
    };

    // TODO: refetch some queries
    const [mutate] = useMutation(options[operation].mutation)

    const handleButtonClick = async () => {
        try{
            const result = await mutate({
                variables:{
                    input: { ...options[operation].variables }
                }
            });
            console.log(result)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <Button 
        variant="contained" 
        color="primary" 
        size="small" 
        onClick={handleButtonClick}
        > 
        {!isFollowing?'Follow':'Unfollow'} 
        </Button>
    )
}

export default Follow;