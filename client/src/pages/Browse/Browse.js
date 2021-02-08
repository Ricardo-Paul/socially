import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, { Fragment } from "react";
import Image from "./Image";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { GET_POST_PHOTOS } from "../../graphql/post";
import { useQuery } from "@apollo/client";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useStore } from "../../store";
import AppDialog from "../../components/AppDialog";
import InfiniteScrolling from "../../components/InfiniteScrolling";
import PostPopUp from "../../components/PostPopUp";

// each 4 photos
// nth-child(5n + )
const useStyles = makeStyles(theme => ({
  image_grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: ".5rem",

    "& > :nth-child(18n+2)":{
      gridColumnStart: 2,
      gridColumnEnd: 2,
      gridRow: "span 2"
    },

    "& > :nth-child(18n + 10)":{
      gridColumn: "1 / span 2",
      gridRow: "span 2"
    },
    "& > :nth-child(9n + 9)": {
      gridColumn: "1 / span 3"
    }
  }
}));


const Browse = () => {
  const classes = useStyles();
  const [{ auth }] = useStore();
  const variables = { authUserId: auth.user.id }
  const { data, loading, fetchMore } = useQuery(GET_POST_PHOTOS, {
    variables
  });

  const [postId, setPostId] = React.useState(null);
  const openModal = (postId) => setPostId(postId);
  const closeModal = () => setPostId(null);

  if(loading || !data.getPosts) return <LoadingIndicator />
  console.log("POSTS PHOTOS", data);

  const { posts, count } = data.getPosts;

  return(
    <Grid container>
      <Grid item md="8" lg="7" xs="12">
        <Box className={classes.image_grid} >
          <InfiniteScrolling
          data={posts}
          fetchMore={fetchMore}
          count={parseInt(count, 10)}
          variables={variables}
          dataKey="getPosts.posts"
          >
            {
              (data) => {
                return(
                  <Fragment>
                    {
                      data.map(p => (
                        <Fragment>
                          <AppDialog open={postId === p.id} onClose={closeModal} >
                            <PostPopUp id={p.id} closeModal={closeModal} />
                          </AppDialog>
                          <Image image={p.image} openModal={() => openModal(p.id)} />
                        </Fragment>
                      ))
                    }
                  </Fragment>
                )
              }
            }
          </InfiniteScrolling>
        </Box>
      </Grid>
    </Grid> 
  )
};

export default Browse;


// { data.getPosts.posts.map(p => (
//   <Image image={p.image} />
// ))}