import { makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT }from '../../constants/DataLimit';
import { useQuery } from '@apollo/client';
import { useStore } from '../../store';
import Modal from "../../components/Modal";


import { GET_FOLLOWED_POSTS } from '../../graphql/post';

const homeStyles = makeStyles({
  home: {
    padding: 10,
    position:"relative",
  }
})

const Home = () => {

  const [{ auth }] = useStore();
  const [values, setValues] = React.useState({
    posts: [],
    count: ""
  });
  const {posts, count} = values;

  const classes = homeStyles();

  const variables = {
    userId: auth.user.id,
    limit: HOME_PAGE_POSTS_LIMIT
  }

  const {data, loading, networkStatus} = useQuery(GET_FOLLOWED_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const renderContent = () => {
    if(loading && networkStatus === 1){
      return <h4> loading ... </h4>
    };


    if(!loading){
      const posts = data.getFollowedPosts.posts
      console.log(data.getFollowedPosts.posts)

      if(!posts.length){
        return <h5> Follow Users, Browse </h5>
      }
      
      return posts.map(post=>(
        <PostCard 
        title={post.title}
        image={post.image}
        username={post.author.username}
        avatar={post.author.image}
        />
      ))
    }
  }
// 

  return <>
  <div className={classes.home}>
    <Modal open={true} />
    <CreatePost />
    {renderContent()}
  </div>
  </>
};

export default Home;
// 
