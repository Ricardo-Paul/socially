import { withStyles, Box, useTheme } from "@material-ui/core";
let gradient;
const theme = localStorage.getItem('theme');

if(!theme || theme === 'dark'){
    gradient = "linear-gradient( 59deg, rgb(0 0 0) 0%, rgb(97 95 95) 50%, rgb(0 0 0) 100%)";
}else{
    gradient = "linear-gradient( 59deg, rgb(255 255 255) 0%, rgb(214 214 214) 50%, rgb(255 255 255) 100%)"
}



export const IconWrapper = withStyles({
    root: {
        backgroundImage: gradient,
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: ".5rem"
    }
})(Box);