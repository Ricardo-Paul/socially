import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary:{
         main: "#1a237e", //indigo9
        }, 
        secondary:{
         main: "#c5cae9" //indigo1
        }
    },
    screen: {
        xs: 540,
        sm: 640,
        md: 1007,
        lg: 1100,
        xl: 1230
    }
})

export const shadows = {
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
        lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}

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
    white: "white",
    black: "black",
    lightGrey: "#e0e0e0"
}
