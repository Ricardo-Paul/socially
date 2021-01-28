import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MenuWrapper from "../App/AppHeader/MenuWrapper";
import defaultAvatar from "../../ressources/defaultAvatar.jpg";
import * as Routes from "../../routes";
import { generatePath, Link } from "react-router-dom";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  list_item: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "1rem",
    "&:hover":{
      backgroundColor: theme.palette.primary.light,
    }
  }
}))

const SearchResult = ({
  searchAnchorEl,
  isOpen,
  users,
  query,
  loading,
  closeMenu,
  messageSearch,
}) => {
  const theme = useTheme();
  const bg_color = theme.palette.primary.main;
  const text_color = theme.palette.primary.contrastText;
  const classes = useStyles();

  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={searchAnchorEl}
      style={{ marginLeft: -50 }}
      closeMenu={closeMenu}
    >


      <Box style={{ width: 250, padding: ".5rem", backgroundColor: bg_color }}>
      {loading && <ListItem className={classes.list_item} > searching... </ListItem>}
      {!users.length > 0 && <ListItem className={classes.list_item} > No result found for {query}</ListItem>}

        {users.map((u) => (
          <React.Fragment>
            <ListItem
              component={Link}
              to={
                messageSearch
                  ? generatePath(Routes.MESSAGE, { id: u.id })
                  : generatePath(Routes.PROFILE, {
                      username: u.username,
                    })
              }
              onClick={closeMenu}
              className={classes.list_item}
            >
              <ListItemAvatar>
                <Avatar alt="user avatar" src={u.image || defaultAvatar} />
              </ListItemAvatar>
              <Box color={text_color} display="flex" flexDirection="column" >
                <Box fontWeight="bold"> {u.fullName} </Box>
                {u.username}
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </Box>
    </MenuWrapper>
  );
};

export default SearchResult;
