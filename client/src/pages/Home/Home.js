import { Box, Grid, Hidden, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { Fragment } from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import PostPopUp from "../../components/PostPopUp";
import * as Routes from "../../routes";
import { generatePath, withRouter } from "react-router-dom";



import { GET_FOLLOWED_POSTS } from "../../graphql/post";
import { theme } from "../../utils/theme";
import PeopleSuggestions from "../../components/peopleSuggestions";
import InfiniteScrolling from "../../components/InfiniteScrolling";
import AppDialog from "../../components/AppDialog";
import PostSkeleton from "../../components/PostSkeleton";
import MobileUserSuggestions from "../../components/MobileUserSuggestions";

const useStyles = makeStyles(theme => ({
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
    // alignContent: "flex-end",
  },
}));

const Home = ({ history }) => {
  const [{ auth }] = useStore();
  const [postId, setPostId] = React.useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // kind of a hack
  // prevent app from crashing when logout


  const openModal = (postId) => {
    setPostId(postId);
  };

  const closeModal = () => {
    setPostId(null);
  };

  const classes = useStyles();

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
      return <PostSkeleton />
    }

    if(data === undefined){
      const token = localStorage.getItem("token");
      if (!token) {
        history.push(Routes.SIGNIN);
        return;
      }
    }

    const { posts, count } = data.getFollowedPosts;

    if (!posts.length) {
      return(
        <Box style={{backgroundColor:"#313131"}} marginTop=".5rem" padding="1rem" borderRadius=".5rem" color="wheat">
          <span style={{fontWeight:"bold"}}> Welcome {auth.user.fullName}  </span> , <br />
          Ooops your feed is so empty, let's improve that.. <br/ >
          Here's what you can do: <br />
           (1) You can upload some photos now and share your thoughts. <br />
           (2) You can Look through the suggestions and start following others. <br />
           <span style={{fontStyle:"italic"}}> 
           Have a good time on Socially, remember, we're a friendly community. 
           </span>
           <p style={{textAlign: "right"}} >Ricardo Paul</p> 
        </Box>
      )
    }

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
                    <PostPopUp 
                    id={post.id} 
                    closeModal={closeModal} 
                    avatar={post.author.image}
                    fullName={post.author.fullName}
                    />
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
      <div className={classes.home}>
        <Grid container spacing={!matches && 2} className={classes.grid}>
          <Grid item md="8" lg="7" xs="12">
              <CreatePost />
              <MobileUserSuggestions /> 
              {renderContent()}
          </Grid>
          <Hidden smDown>
            <Grid item md="4" lg="4" xs="12">
              {/* <PeopleSuggestions /> */}
            </Grid>
          </Hidden>
        </Grid>
      </div>
  );
};

export default withRouter(Home);
