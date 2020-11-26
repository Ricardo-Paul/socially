import { makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";
import { HOME_PAGE_POSTS_LIMIT }from '../../constants/DataLimit';
import { useQuery } from '@apollo/client';
import { useStore } from '../../store';

import { GET_FOLLOWED_POSTS } from '../../graphql/post';

const homeStyles = makeStyles({
  home: {
    padding: 10
  }
})

const Home = () => {
  const [userId, setUserId] = React.useState('');

  const [{ auth }] = useStore();
  const classes = homeStyles();

  React.useEffect(() => {
    setUserId(auth.user.id);
  }, [userId, auth]);


  const variables = {
    userId: auth.user.id,
    limit: HOME_PAGE_POSTS_LIMIT
  }

  const {data, loading, networkStatus} = useQuery(GET_FOLLOWED_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  console.log('QUERY DATA', data);

  return <>
  <div className={classes.home}>
    <CreatePost />
    <PostCard />
  </div>
  </>
};

export default Home;
// 
