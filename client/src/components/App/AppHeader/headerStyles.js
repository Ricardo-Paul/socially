const { makeStyles } = require("@material-ui/core");

const headerStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    backgroundColor: theme.palette.custom.palette.thirdColor,
    display: "flex",
    justifyContent: "center",
    borderBottom: theme.palette.custom.border
  },
  toolBar: { 
    zIndex: 700,
    display: "flex",
    width: "100%",
    margin: "0 auto",
    padding: 0,
    [theme.breakpoints.down("sm")]: { 
      width: "100%",
    },
  },
  middle: {
    paddingLeft: theme.palette.custom.drawerWidth, //keep header in sync with the body
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  search: {
    // backgroundColor: theme.palette.primary.light,
    border: "solid #923891 3px",
    display: "flex",
    borderRadius: theme.palette.shape.inputBorderRadius,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
    '&::placeholder':{
      color: "#ffffff"
    }
  },
  searchIcon: {
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
    padding: 0
  },
  appName: {
    color: theme.palette.custom.palette.thirdColorText,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  popper: {
    zIndex: 1000,
    [theme.breakpoints.up("lg")]: {
      marginTop: 15,
    },
    maxHeight: 450,
    overflow: "auto",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "1rem",
    boxShadow: theme.palette.custom.boxShadow,
    // boxShadow: "1px 2px 3px 4px #ececec",
    padding: ".5rem",
  },
  mobileDrawer: {
    backgroundColor: theme.palette.custom.palette.drawerBackground,
    width: "90%"
  },
  toolbar_container: {
    display: "flex"
  }
}));
 
export default headerStyles;
