import { colors } from "../../../utils/theme";

const { makeStyles } = require("@material-ui/core");

const headerStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
  },
  toolBar: {
    zIndex: 700,
    display: "flex",
    backgroundColor: colors.white,
    width: "70%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
    },
  },
  search: {
    border: "1.2px solid #a9a8a8",
    backgroundColor: "#efefef",
    display: "flex",
    borderRadius: 5,
    // marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
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
  grow: {
    flexGrow: 1,
  },
  // hide the menu icon from md all the way up
  menuIcon: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appName: {
    color: colors.lighRed,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  popper: {
    zIndex: 1000,
    [theme.breakpoints.up("lg")]: {
      marginTop: 15,
    },
    maxHeight: 350,
    overflow: "auto",
  },
}));

export default headerStyles;
