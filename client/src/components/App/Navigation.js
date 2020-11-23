import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import * as Routes from '../../routes';

// icons
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MessageIcon from '@material-ui/icons/Message';
import InfoIcon from '@material-ui/icons/Info';

// partially set all routes to home
const Navigation = () => {
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
          {list}
        </List>
        </>
    )
}

export default Navigation;