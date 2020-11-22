import { InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import headerStyles from './headerStyles';

const Search = () => {
    const classes = headerStyles();

    const inputBaseClasses = {
        root: classes.inputRoot,
        input: classes.inputInput
    }

    return <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase classes={inputBaseClasses} placeholder="Search..." />
    </div>
}

export default Search;