import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { CREATE_FOLLOW, DELETE_FOLLOW } from "../graphql/follow";
import { useStore } from "../store";
import PropTypes from "prop-types"

// Queries
import { GET_FOLLOWED_POSTS } from "../graphql/post";
import { GET_AUTH_USER, GET_USERS, SUGGEST_PEOPLE } from "../graphql/user";
import { HOME_PAGE_POSTS_LIMIT } from "../constants/DataLimit";

const Follow = ({ user }) => {
  const [{ auth }] = useStore();

  const isFollowing = user.followers.find((f) => f.follower === auth.user.id);
  const operation = isFollowing ? "delete" : "create";

  const options = {
    create: {
      mutation: CREATE_FOLLOW,
      variables: {
        currentUserId: auth.user.id, // current user is the following
        followedUserId: user.id, //follwed user (follower)
      },
    },
    delete: {
      mutation: DELETE_FOLLOW,
      variables: {
        followId: isFollowing ? isFollowing.id : null,
      },
    },
  };

  // TODO: refetch some queries
  const [mutate] = useMutation(options[operation].mutation, {
    refetchQueries: [
      {
        query: GET_FOLLOWED_POSTS,
        variables: {
          userId: auth.user.id,
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        },
      },
      { query: GET_AUTH_USER },
      { query: GET_USERS, variables: { userId: auth.user.id } },
      { query: SUGGEST_PEOPLE, variables: { userId: auth.user.id } }
    ],
  });

  const handleButtonClick = async () => {
    try {
      const result = await mutate({
        variables: {
          input: { ...options[operation].variables },
        },
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      variant="contained"
      color={isFollowing ? "primary" : "secondary"}
      size="small"
      onClick={handleButtonClick}
      fullWidth
    >
      {!isFollowing ? "Follow" : "Unfollow"}
    </Button>
  );
};

Follow.PropTypes = {
  user: PropTypes.object.isRequired
}

export default Follow;
