import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";


const useSytles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  }
}));

function HideOnScroll(props){
  const { children } = props;
  const trigger = useScrollTrigger();

  return(
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  )
}

const BottomAppBar = (props) => {
  const classes = useSytles();
  return(
   <HideOnScroll {...props} >
    <AppBar position="fixed" className={classes.appBar}  >
      <Toolbar>
        Bottom app bar
      </Toolbar>
    </AppBar>
   </HideOnScroll>
  )
}

export default BottomAppBar;