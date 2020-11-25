import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles, CssBaseline } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import * as Routes from '../../routes';
import { useStore } from '../../store';
import Divider from '@material-ui/core/Divider';

// icons
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MessageIcon from '@material-ui/icons/Message';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle } from '@material-ui/icons';

import { colors, shadows } from '../../utils/theme';

const navStyles = makeStyles(theme => ({
    navContainer:{
        paddingTop: 20,
        // backgroundColor: "red",
        position:"relative",

    },
    list:{
        // these styles are enabled for small screen
        // all the way up.. not for xs 
        [theme.breakpoints.up("sm")]:{
            color: colors.white,
            width: "70%",
            paddingLeft: 40,
            position:"absolute",
            boxShadow: shadows.md,
            padding: 15,
            left: "50%",
            transform: "translateX(-50%)"
          },
    },
    listItem:{
        // backgroundColor: colors.indigo1,
        width: "100%",
    }
}))

// partially set all routes to home
const Navigation = () => {
    const [{auth}] = useStore();
    const styles = {color: colors.indigo9}
    const nameStyles = {backgroudcolor: colors.indigo9, color: colors.white}

    // set the user to local so we can access
    // its properties
    const [user, setUser] = useState({});
    useEffect(() => {
        if(auth.user){
            setUser(auth.user)
        }
    }, [auth]);

    const classes = navStyles();


    const options = [
        {title: "Home", icon: <HomeIcon />, to: Routes.HOME },
        {title: "Browse Feed", icon: <WebIcon />, to: Routes.HOME},
        {title: "People", icon: <PeopleIcon />, to: Routes.HOME },
        {title: "Notifications", icon: <NotificationsActiveIcon />, to: Routes.HOME},
        {title: "Messages", icon: <MessageIcon />,to: Routes.HOME  },
        {title: "About", icon: <InfoIcon />,to: Routes.HOME}
    ]
    const list = options.map((item, index) => {

        return (
            <NavLink to={item.to}>
                <ListItem key={index} className={classes.listItem} >
                    <ListItemIcon style={styles}> {item.icon} </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
            </NavLink>
        );
    })

    return(
        <>
        <CssBaseline />
        <div className={classes.navContainer}>
        <List className={classes.list}>
        <ListItem>
            <ListItemIcon style={styles}> <AccountCircle /> </ListItemIcon>
            <Typography variant="h4" style={nameStyles} >
                <ListItemText primary={user.fullName} />
            </Typography>
        </ListItem>
        <Divider />
          {list}
        </List>
        </div>
        </>
    )
}

export default Navigation;