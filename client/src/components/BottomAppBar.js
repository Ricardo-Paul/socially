import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import * as Routes from "../routes";


import IconButton from '@material-ui/core/IconButton';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolBar: {
    display: "flex",
    backgroundColor: theme.palette.custom.palette.thirdColor,
    justifyContent: "space-around"
  },
  button: {
    color: theme.palette.custom.palette.thirdColorText
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

function ToolbarButton(props){
  const history = useHistory();
  const classes = useStyles();
  const { children, route } = props;
  return(
    <IconButton classes={{root: classes.button}} onClick={()=> history.push(route)  } >
      {children}
    </IconButton>
  )
}

const BottomAppBar = (props) => {
  const classes = useStyles();
  return(
   <HideOnScroll {...props} >
    <AppBar position="fixed" className={classes.appBar}  >
      <Toolbar className={classes.toolBar}>
        <ToolbarButton route={Routes.PEOPLE} > <PeopleOutlinedIcon /> </ToolbarButton>
        <ToolbarButton route={Routes.HOME} > <HomeOutlinedIcon /> </ToolbarButton>
        <ToolbarButton route={Routes.BROWSE}> <PhotoLibraryOutlinedIcon /> </ToolbarButton>
      </Toolbar>
    </AppBar>
   </HideOnScroll>
  )
}

export default BottomAppBar;