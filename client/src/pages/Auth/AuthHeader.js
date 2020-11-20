import React from 'react';
import AppInfo from '../../constants/AppInfo.json';
const { AppBar, Toolbar, Typography } = require("@material-ui/core");

/**
 * App header when user is not authenticated
 */

export default () => {
    return(
        <AppBar>
            <Toolbar>
                <Typography varaiant="h4">
                {AppInfo.name}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
