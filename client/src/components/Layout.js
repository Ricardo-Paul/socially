import { theme } from "../utils/theme";
const { Container, withStyles } = require("@material-ui/core");
/**
 * used as the major container for auth pages
 */
const MainContainer = withStyles({
  root: {
    marginTop: "80px",
    [theme.breakpoints.down("xs")]: {
      marginTop: 65,
    },
  },
})(Container);

// a layer covering the whole screen
const Overlay = withStyles({
  postion: "fixed",
  width: "100%",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: "rgba(0,0,0,0.8)",
});

export { MainContainer, Overlay };
