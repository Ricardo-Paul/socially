import React from 'react';
import { MenuList, MenuItem, Paper } from '@material-ui/core';

const PostCardOptions = () => {

    return<>
       <Paper elevation={3}>
        <MenuList>
            <MenuItem> Copy URL</MenuItem>
            <MenuItem> Delete </MenuItem>
         </MenuList>
       </Paper>
    </>
}

export default PostCardOptions;