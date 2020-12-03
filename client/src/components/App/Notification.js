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
            { notification.like && 
            <>
            <ListItemText primary={`${senderName} likes your post`} />
            <div style={{width:45, height:45, marginLeft:5}}>
             <img src={notification.like.post.image} style={{width:"100%", height:"100%", objectFit:"cover"}} />
            </div> 
            </>
            }
        </ListItem>
    )
}

export default Notification;