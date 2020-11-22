import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    /**
     * colors
     */
    palette: {
        primary:{
            main: "#212121",
            light: "#757575"
        }, 
        secondary:{
            main: "#ff9800"
        }
    },
    /**
     * breakpoints
     */
    screen: {
        xs: 540,
        sm: 640,
        md: 1007,
        lg: 1100,
        xl: 1230
    }
})