import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    /**
     * colors
     *
     */
    palette: {
        primary:{
            main: "#212121",
            light: "#757575"
        }, 
        secondary:{
            main: "#ff5722"
        }
    },

    colors: {
        darkGrey: "#424242",
        lighRed: "#ff5722"
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

export const colors = {
    darkGrey: "#424242",
    lighRed: "#ff5722",
    black: "black"
}