import React from 'react';
import { 
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@material-ui/core';

const Notification = ({ notification }) => {
    const avatar = "https://material-ui.com/static/images/avatar/2.jpg"
    if(!notification.like && !notification.comment && !notification.follow){
        return
    }

    let senderName = notification.sender ? notification.sender.fullName : null;

    return(
        <ListItem button>
            <ListItemAvatar>
                <Avatar alt="user avatar" src={avatar} />
            </ListItemAvatar>
            { notification.like && <ListItemText primary={`${senderName} likes your post`} /> }
        </ListItem>
    )
}

export default Notification;