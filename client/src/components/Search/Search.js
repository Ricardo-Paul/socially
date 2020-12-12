import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import headerStyles from "../App/AppHeader/headerStyles";
import SearchResult from "./searchResult";

const Search = () => {
  const classes = headerStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const inputBaseClasses = {
    root: classes.inputRoot,
    input: classes.inputInput,
  };

  const handleChange = (event) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase classes={inputBaseClasses} placeholder="Search..." onChange={(event)=> handleChange(event)} />
      <SearchResult searchAnchorEl={anchorEl} isOpen={Boolean(anchorEl)} />
    </div>
  );
};

export default Search;