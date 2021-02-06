const { makeStyles } = require("@material-ui/core");

const headerStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "center",
    borderBottom: theme.palette.custom.border
  },
  toolBar: { 
    zIndex: 700,
    display: "flex",
    width: "70%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: { 
      width: "100%",
      padding: 0,
    },
  },
  search: {
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    borderRadius: theme.palette.shape.inputBorderRadius,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
    '&::placeholder':{
      color: theme.palette.primary.contrastText
    }
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
    padding: 0
  },
  appName: {
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
    padding: ".5rem",
  },
  mobileDrawer: {
    backgroundColor: theme.palette.custom.palette.drawerBackground,
    width: "90%"
  }
}));
 
export default headerStyles;
