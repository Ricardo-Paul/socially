import React from "react";
import { Box, makeStyles } from "@material-ui/core";
// const isMobile = window.screen.width < 958;
// export const PageContainer = withStyles({ root: { marginLeft: !isMobile && 20 } })(Box);

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 20,
        [theme.breakpoints.down("sm")]:{
            marginLeft: 0
        }
    }
}));

export const PageContainer = ({children}) => {
    const classes = useStyles();
    return(
      <Box className={classes.root}>
        {children}
      </Box>
    )
}
