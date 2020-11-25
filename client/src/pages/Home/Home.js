import { makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/Postcard";

const homeStyles = makeStyles({
  home: {
    padding: 10
  }
})

const Home = () => {
  const classes = homeStyles();

  return <>
  <div className={classes.home}>
    {/* <CreatePost /> */}
    <PostCard />
  </div>
  </>
};

export default Home;
// 
