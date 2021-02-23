import { useApolloClient } from "@apollo/client";
import { InputBase, useTheme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { SEARCH_USERS } from "../../graphql/search";
import useDebounce from "../../hooks/useDebounce";
import headerStyles from "../App/AppHeader/headerStyles";
import SearchResult from "./searchResult";
import PropTypes from "prop-types";
import { useStore } from "../../store";

const Search = ({ placeholder, messageSearch, fullWidth, ...rest }) => {
  const client = useApolloClient();
  const classes = headerStyles();
  const [{ auth }] = useStore();
  const theme = useTheme();
  const text_color = theme === "dark" ? "#ffffff" : "#a0a0a0" ;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [foundUsers, setFoundUsers] = React.useState([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const closeMenu = () => setSearchQuery("");
  // handle input change
  const handleChange = (event) => {
    // trim white space from the beginning
    const value = event.target.value.replace(/^\s+/g, "");
    setAnchorEl(event.currentTarget);
    setSearchQuery(value);
    if (value) {
      setLoading(true);
    }
  };

  // the effect will run based on the existence of a
  // debounced search query
  React.useEffect(() => {
    const search = async () => {
      const { data } = await client.query({
        query: SEARCH_USERS,
        variables: { searchQuery: debounceSearchQuery },
      });

      setLoading(false);
      const users = data.searchUsers.filter( u => u.id !== auth.user.id)
      setFoundUsers(users);
      setIsSearchOpen(debounceSearchQuery != "");
    };

    search();
  }, [client, debounceSearchQuery]);

  return (
    <div className={classes.search} {...rest}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{color: text_color}} />
      </div>
      <InputBase
        fullWidth={fullWidth ? true : false}
        // classes={inputBaseClasses}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
        style={{color: text_color, padding: ".3rem"}}
      />

      <SearchResult
        searchAnchorEl={anchorEl}
        isOpen={isSearchOpen}
        users={foundUsers}
        query={debounceSearchQuery}
        loading={loading}
        closeMenu={closeMenu}
        messageSearch={messageSearch}
      />
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  messageSearch: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Search;
