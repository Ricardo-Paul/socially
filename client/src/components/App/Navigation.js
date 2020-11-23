import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
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


// partially set all routes to home
const Navigation = () => {
    const [{auth}] = useStore();

    const [user, setUser] = useState({});
    useEffect(() => {
        if(auth.user){
            setUser(auth.user)
        }
    }, [auth])

    console.log("USER NAV", user.fullName);


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
                <ListItem key={index} >
                    <ListItemIcon style={{color:"white"}}> {item.icon} </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
        );
    })

    return(
        <>
        <List>
        <ListItem>
            <ListItemIcon style={{color:"white"}}> <AccountCircle /> </ListItemIcon>
            <Typography variant="h6" style={{color:"white"}} >
                <ListItemText primary={user.fullName} />
            </Typography>
        </ListItem>
          {list}
        </List>
        </>
    )
}

export default Navigation;