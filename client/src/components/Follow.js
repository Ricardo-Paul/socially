import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { CREATE_FOLLOW, DELETE_FOLLOW } from "../graphql/follow";
import { useStore } from "../store";
import PropTypes from "prop-types";
import * as Routes from "./../routes";

// Queries
import { GET_FOLLOWED_POSTS } from "../graphql/post";
import { GET_AUTH_USER, GET_USERS, SUGGEST_PEOPLE } from "../graphql/user";
import { HOME_PAGE_POSTS_LIMIT } from "../constants/DataLimit";
import LoadingIndicator from "./LoadingIndicator";

const Follow = ({ user, icon: Icon, style }) => {
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
        followId: isFollowing ? isFollowing.id : null,Follow
      },
    },
  };

  // TODO: refetch some queries
  const [mutate, { loading }] = useMutation(options[operation].mutation, {
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
      { query: SUGGEST_PEOPLE, variables: { userId: auth.user.id } },
    ],
  });

  const handleButtonClick = async () => {
    console.log("USER", user);
    console.log("ISFOLLOWING", isFollowing);
    try {
      await mutate({
        variables: {
          input: { ...options[operation].variables },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color={isFollowing ? "secondary" : "#6c6c6d"}
        size="small"
        onClick={handleButtonClick}
        fullWidth
        style={style}
      >
        {!isFollowing ? "Follow" : "Unfollow"}
        {Icon && <Icon style={{ marginLeft: 10 }} />}
        {loading && <LoadingIndicator /> }
      </Button>
    </React.Fragment>
  );
};

Follow.propTypes = {
  user: PropTypes.object.isRequired,
  icon: PropTypes.elementType,
};

export default Follow;
