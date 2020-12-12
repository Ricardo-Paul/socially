import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import MenuWrapper from "../App/AppHeader/MenuWrapper";

const SearchResult = ({ searchAnchorEl, isOpen, users }) => {

    const avatar = "https://material-ui.com/static/images/avatar/2.jpg";

    return(
       <MenuWrapper isOpen={isOpen} anchorEl={searchAnchorEl} >
           <List style={{width: 240}}>
                {users.map(u => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="user avatar" src={avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={u.fullName} secondary={u.username} />
                </ListItem>
                ))}
           </List>
       </MenuWrapper>
    )
}

export default SearchResult;