import { makeStyles } from "@material-ui/core";
import React from "react";
import CreatePost from "../../components/CreatePost";

const homeStyles = makeStyles({
  home: {
    padding: 10
  }
})

const Home = () => {
  const classes = homeStyles();

  return <>
  <div className={classes.home}>
    HOME PAGE
    <CreatePost />
  </div>
  </>
};

export default Home;
