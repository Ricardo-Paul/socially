import { List, ListItem } from "@material-ui/core";
import React from "react";
import MenuWrapper from "../App/AppHeader/MenuWrapper";

const SearchResult = ({ searchAnchorEl }) => {

    return(
       <MenuWrapper isOpen={true} anchorEl={searchAnchorEl} >
           <List>
               <ListItem> First search result </ListItem>
           </List>
       </MenuWrapper>
    )
}

export default SearchResult;