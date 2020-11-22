import React from 'react';
import { Drawer, ListItem } from '@material-ui/core';


const Navigation = () => {
    const options = [{title: "Home"}, {title: "Notifications"}, {title: "Messages"}, {title: "About"}]
    const list = options.map(item => {
        return (
            <ListItem> {item.title} </ListItem>
        );
    })

    return(
        <>
          {list}
        </>
    )
}

export default Navigation;