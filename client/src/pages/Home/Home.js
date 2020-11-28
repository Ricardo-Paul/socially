import { makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import Modal from "../../components/Modal";
import PostPopUp from "../../components/PostPopUp";


import { GET_FOLLOWED_POSTS } from "../../graphql/post";

const homeStyles = makeStyles({
  home: {
    padding: 10,
    position: "relative",
  },
});

const Home = () => {
  const [{ auth }] = useStore();
  const [postId, setPostId] = React.useState(null); 

  const openModal = (postId) => {
    setPostId(postId)
  }

  const closeModal = () =>{
    setPostId(null);
  }

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
      console.log('FollowedPosts',data.getFollowedPosts.posts);
      posts.map(p => {
        console.log('AUTHOR: ',p.author)
        console.log('COMMENTS', p.comments)
      })

      if (!posts.length) {
        return <h5> Follow Users, Browse </h5>;
      }
// we compare the id in the state var with the current postid
// to decide whether to open the modal
      return posts.map((post) => (
        <Fragment key={post.id}>
          <Modal open={postId === post.id} onClose={closeModal}>
           <PostPopUp closeModal={closeModal} comments={post.comments} postImage={post.image} />
          </Modal>

          <PostCard
            title={post.title}
            image={post.image}
            username={post.author.username}
            avatar={post.author.image}
            openModal={() => openModal(post.id)} //save the post.id in a state var
          />
        </Fragment>
      ));
    }
  };
  //

  return (
    <>
      <div className={classes.home}>
        <CreatePost />
        {renderContent()}
      </div>
    </>
  );
};

export default Home;
//
