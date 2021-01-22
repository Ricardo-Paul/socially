import { Box, Dialog, Grid, Hidden, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import Modal from "../../components/Modal";
import PostPopUp from "../../components/PostPopUp";
import * as Routes from "../../routes";
import { generatePath, withRouter } from "react-router-dom";

import { GET_FOLLOWED_POSTS } from "../../graphql/post";
import { theme } from "../../utils/theme";
import PeopleSuggestions from "../../components/peopleSuggestions";
import InfiniteScrolling from "../../components/InfiniteScrolling";
import AppDialog from "../../components/AppDialog";

const homeStyles = makeStyles({
  home: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  headerTitle: {
    fontSize: "16px",
    fontFamily: "roboto",
    fontWeight: 500,
  },
  grid: {
    display: "flex",
    alignContent: "flex-end",
    flexDirection: "row"
  }
});

const Home = ({ history }) => {
  const [{ auth }] = useStore();
  const [postId, setPostId] = React.useState(null);

  // kind of a hack
  // prevent app from crashing when logout
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push(Routes.SIGNIN);
      return;
    }
  }, [auth.user]);

  // pushState args (state, title, url)
  const openModal = (postId) => {
    setPostId(postId);
    // window.history.pushState("", "", generatePath(Routes.POST, { id: postId }));
  };

  const closeModal = () => {
    setPostId(null);
  };

  const classes = homeStyles();

  const variables = {
    userId: auth.user.id,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

  const { data, loading, networkStatus, fetchMore} = useQuery(
    GET_FOLLOWED_POSTS,
    {
      variables,
      notifyOnNetworkStatusChange: true,
    }
  );

  const renderContent = () => {
    if (loading && networkStatus === 1) {
      return <h4> loading ... </h4>;
    }

    const { posts, count } = data.getFollowedPosts;


    if (!posts.length) {
      return <h5> Follow Users, Browse </h5>;
    }
    // we compare the id in the state var with the current postid
    // to decide whether to open the modal
    return (
      <InfiniteScrolling
        data={posts}
        fetchMore={fetchMore}
        dataKey="getFollowedPosts.posts"
        count={parseInt(count)}
        variables={variables}
      >
        {(data) => {
          const showNextLoading =
            loading && networkStatus === 3 && count !== data.length;
          return (
            <Fragment>
              {data.map((post) => (
                <Fragment key={post.id}>
                  {/* modal postId === post.id*/}
                  <AppDialog open={postId === post.id} onClose={closeModal}>
                    <PostPopUp id={post.id} closeModal={closeModal} />
                  </AppDialog> 

                  {/* regualar post card */}
                  <PostCard
                    title={post.title}
                    image={post.image}
                    fullName={post.author.fullName}
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
              ))}
              {showNextLoading && <h3> loading more ... </h3>}
            </Fragment>
          );
        }}
      </InfiniteScrolling>
    );
  };
  //

  return (
    <>
      <div className={classes.home}>
        <Grid container spacing={3} className={classes.grid}>
          <Hidden>
            <Grid item md={2} />
          </Hidden>
          <Grid item md="6" xs="12">
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

export default withRouter(Home);
