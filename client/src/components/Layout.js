const { Container, withStyles } = require("@material-ui/core");

const MainContainer = withStyles({
  root: {
    marginTop: "10%",
  },
})(Container);

export { MainContainer };
