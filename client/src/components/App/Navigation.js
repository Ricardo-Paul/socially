import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import * as Routes from '../../routes';
import { useStore } from '../../store';


// icons
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MessageIcon from '@material-ui/icons/Message';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle } from '@material-ui/icons';

import { colors } from '../../utils/theme';

const navStyles = makeStyles(theme => ({
    list:{
        paddingLeft: 30
    },
    listItem:{
        backgroundColor: colors.indigo8,
        color: colors.white,
        width: "70%"
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
        <List className={classes.list}>
        <ListItem>
            <ListItemIcon style={styles}> <AccountCircle /> </ListItemIcon>
            <Typography variant="h4" style={nameStyles} >
                <ListItemText primary={user.fullName} />
            </Typography>
        </ListItem>
          {list}
        </List>
        </>
    )
}

export default Navigation;