import React from "react";
import { Skeleton } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  post_skeleton: {
    borderRadius: theme.palette.shape.borderRadius,
    padding: ".5rem"
  },
  skeleton_header:{
    display: "flex",
    justifyContent: "center"
  },
  skeleton_header_text:{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: "1rem",
    marginBottom: "2rem"
  }
}))

const PostSkeleton = () => {
    const classes = useStyles();
    const count = [0, 1, 2];

    return count.map(s  => (
      <Box className={classes.post_skeleton}>
        <Box className={classes.skeleton_header}>
        <Skeleton variant="circle" width={40} height={40} style={{backgroundColor: "#424242"}}  />
        <Box className={classes.skeleton_header_text}>
          <Skeleton animation="wave"  variant="text" width="20%" height={"1rem"}
          style={{backgroundColor: "#424242"}}  />
          <Skeleton animation="wave"  variant="text" width="10%" height={"1rem"} 
          style={{backgroundColor: "#424242"}} />
        </Box>
        </Box>
        <Skeleton animation="wave" variant="rect" width="100%" height={210} style={{backgroundColor: "#424242"}} />
      </Box>
    ))
}

export default PostSkeleton;