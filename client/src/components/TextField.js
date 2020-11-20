const { withStyles, TextField, createMuiTheme } = require("@material-ui/core");
const theme = createMuiTheme();

export default withStyles({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
})(TextField);
