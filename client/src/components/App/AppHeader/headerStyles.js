import { theme, colors } from "../../../utils/theme";

const { makeStyles } = require("@material-ui/core");

const headerStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    backgroundColor: colors.indigo8,
    display: "flex",
    justifyContent: "center",
  },
  toolBar: {
    zIndex: 700,
    display: "flex",
    backgroundColor: colors.indigo8,
    width: "70%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
    },
  },
  search: {
    backgroundColor: "white",
    display: "flex",
    borderRadius: 15,
    marginLeft: 20,
    [theme.breakpoints.down(`${theme.screen.sm}`)]: {
      marginLeft: 5,
    },
  },
  searchIcon: {
    color: "black",
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {},
  inputInput: {
    padding: 5,
    height: "90%",
  },
  badge: {
    // color: "red",
  },
  grow: {
    flexGrow: 1,
  },
  // hide the menu icon from md all the way up
  menuIcon: {
    [theme.breakpoints.up(`${theme.screen.sm}`)]: {
      display: "none",
    },
  },
  appName: {
    color: colors.lighRed,
    [theme.breakpoints.down(`${theme.screen.sm}`)]: {
      display: "none",
    },
  },
}));

export default headerStyles;
