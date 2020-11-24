import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    /**
     * colors
     *
     */
    palette: {
        primary:{
            main: "#1a237e", //indigo9
            light: "#c5cae9" // indigo1
        }, 
        secondary:{
            main: "#c5cae9" //indigo1
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
    black: "black",
// top darker
    indigo9: "#1a237e",
    indigo8: "#283593",
    indigo6: "#3949ab",
    indigo4: "#5c6bc0",
    indigo1: "#c5cae9",
    indigo0: "#e8eaf6",
    white: "white"
}

