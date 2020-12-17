import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import MenuWrapper from "../App/AppHeader/MenuWrapper";

const SearchResult = ({ searchAnchorEl, isOpen, users, query, loading, closeMenu }) => {
  const avatar = "https://material-ui.com/static/images/avatar/2.jpg";

  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={searchAnchorEl}
      style={{ marginLeft: -50 }}
      closeMenu={closeMenu}
    >
      {loading && <ListItem> searching... </ListItem>}

      {!users.length > 0 && <ListItem>No result found for {query}</ListItem>}
      <List style={{ width: 250, paddingLeft: 10 }}>
        {users.map((u) => (
          <React.Fragment>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="user avatar" src={avatar} />
              </ListItemAvatar>
              <ListItemText primary={u.fullName} secondary={u.username} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </MenuWrapper>
  );
};

export default SearchResult;
