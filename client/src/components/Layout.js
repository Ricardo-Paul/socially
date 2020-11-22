import { theme } from "../utils/theme";
const { Container, withStyles } = require("@material-ui/core");
/**
 * used as the major container for all pages 
 */
const MainContainer = withStyles({
  root: {
    marginTop: "80px",
    [theme.breakpoints.down("xs")]:{
      marginTop: 65
    }
  },
})(Container);

export { MainContainer };
