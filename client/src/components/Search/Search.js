import { useApolloClient } from "@apollo/client";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { SEARCH_USERS } from "../../graphql/search";
import useDebounce from "../../hooks/useDebounce";
import headerStyles from "../App/AppHeader/headerStyles";
import SearchResult from "./searchResult";
import PropTypes from "prop-types";

const Search = ({ placeholder }) => {
  const client = useApolloClient();
  const classes = headerStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [foundUsers, setFoundUsers] = React.useState([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const inputBaseClasses = {
    root: classes.inputRoot,
    input: classes.inputInput,
  };

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
      setFoundUsers(data.searchUsers);
      setIsSearchOpen(debounceSearchQuery != "");
    };

    search();
  }, [client, debounceSearchQuery]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={inputBaseClasses}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
      />

      <SearchResult
        searchAnchorEl={anchorEl}
        isOpen={isSearchOpen}
        users={foundUsers}
        query={debounceSearchQuery}
        loading={loading}
        closeMenu={closeMenu}
      />
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string
}

export default Search;
