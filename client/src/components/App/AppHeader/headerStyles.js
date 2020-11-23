import { theme , colors} from "../../../utils/theme";

const { makeStyles } = require("@material-ui/core");

const headerStyles = makeStyles((theme) => ({
    appBar:{
        position:"absolute",
        backgroundColor:"black",
        display: "flex",
        justifyContent:"center"
    },
    toolBar:{
        display: "flex",
        backgroundColor:"black",
        width: '70%',
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        }
    },
    search: {
        backgroundColor: "white",
        display: "flex",
        borderRadius: 15,
        marginLeft: 20,
        [theme.breakpoints.down(`${theme.screen.sm}`)]:{
            marginLeft: 5
        }
    },
    searchIcon: {
        color: "black",
        padding: 5,
        display: "flex",
        alignItems: "center",
    },
    inputRoot:{

    },
    inputInput: {
        padding: 5,
        height: "90%"
    },
    badge: {
        // color: "red",
    },
    grow: {
        flexGrow: 1
    },
    // hide the menu icon from md all the way up
    menuIcon: {
        [theme.breakpoints.up(`${theme.screen.sm}`)]: {
            display: "none"
        }
    },
    appName: {
        color: colors.lighRed,
        [theme.breakpoints.down(`${theme.screen.sm}`)]:{
            display: "none"
        }
    }
}));

export default headerStyles;