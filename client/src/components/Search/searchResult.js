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
import * as Routes from "../../routes";
import { generatePath, Link } from "react-router-dom"

const SearchResult = ({ searchAnchorEl, isOpen, users, query, loading, closeMenu, messageSearch }) => {

  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={searchAnchorEl}
      style={{ marginLeft: -50 }}
      closeMenu={closeMenu}
    >
      {loading && <ListItem> searching... </ListItem>}

      {!users.length > 0 && <ListItem> No result found for {query}</ListItem>}
      <List style={{ width: 250, paddingLeft: 10 }}>
        {users.map((u) => (
          <React.Fragment>
            {/* TODO: replace id */}
            <ListItem component={Link} to={
              messageSearch ? generatePath(Routes.MESSAGE, { userId: "replaceId"}) : 
              generatePath(Routes.PROFILE, {
                username: u.username
              })
            }
            onClick={closeMenu}
            >
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
