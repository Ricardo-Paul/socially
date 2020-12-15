import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import Modal from "../../components/Modal";
import PostPopUp from "../../components/PostPopUp";
import * as Routes from "../../routes";
import { generatePath } from "react-router-dom";

import { GET_FOLLOWED_POSTS } from "../../graphql/post";
import { theme } from "../../utils/theme";
import PeopleSuggestions from "../../components/peopleSuggestions";

const homeStyles = makeStyles({
  home: {
    position: "relative",
    marginLeft: 20,
    [theme.breakpoints.down("sm")]:{
      marginLeft: 0
    }
  },
  headerTitle: {
    fontSize: "16px",
    fontFamily: "roboto",
    fontWeight: 500
  }
});

const Home = () => {
  const [{ auth }] = useStore();
  const [postId, setPostId] = React.useState(null);

  // pushState args (state, title, url)
  const openModal = (postId) => {
    setPostId(postId);
    window.history.pushState("", "", generatePath(Routes.POST, { id: postId }));
  };

  const closeModal = () => {
    setPostId(null);
  };

  const classes = homeStyles();

  const variables = {
    userId: auth.user.id,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

  const { data, loading, networkStatus } = useQuery(GET_FOLLOWED_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const renderContent = () => {
    if (loading && networkStatus === 1) {
      return <h4> loading ... </h4>;
    }

    if (!loading) {
      const posts = data.getFollowedPosts.posts;
      console.log("FollowedPosts", data.getFollowedPosts.posts);

      posts.map((p) => {
        console.log("AUTHOR: ", p.author);
        console.log("COMMENTS", p.comments);
      });

      if (!posts.length) {
        return <h5> Follow Users, Browse </h5>;
      }
      // we compare the id in the state var with the current postid
      // to decide whether to open the modal
      return posts.map((post) => (
        <Fragment key={post.id}>
          {/* modal */}
          <Modal open={postId === post.id} onClose={closeModal}>
            <PostPopUp
              closeModal={closeModal}
              comments={post.comments}
              postImage={post.image}
              author={post.author.fullName}
              postTitle={post.title}
              createdAt={post.createdAt}
            />
          </Modal>

          {/* regualar post card */}
          <PostCard
            title={post.title}
            image={post.image}
            username={post.author.username}
            avatar={post.author.image}
            openModal={() => openModal(post.id)} //save the post.id in a state var
            likeNumber={post.likes.length}
            commentNumber={post.comments.length}
            likes={post.likes}
            postId={post.id}
            postAuthor={post.author}
            imagePublicId={post.imagePublicId}
            comments={post.comments}
          />
        </Fragment>
      ));
    }
  };
  //

  return (
    <>
      <div className={classes.home}>
        <Grid container spacing={3}>
          <Grid item md="8" xs="12">
            <Box>
              <CreatePost />
              {renderContent()}
            </Box>
          </Grid>
          <Grid item md="4" xs="12">
            <PeopleSuggestions />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
