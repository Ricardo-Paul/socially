import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import MenuWrapper from "../App/AppHeader/MenuWrapper";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";

const SearchResult = ({ searchAnchorEl, isOpen, users, query, loading, closeMenu }) => {

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
                <Avatar alt="user avatar" src={u.image || defaultAvatar} />
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
