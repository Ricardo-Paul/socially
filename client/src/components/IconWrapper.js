import { withStyles, Box } from "@material-ui/core";

export const IconWrapper = withStyles({
    root: {
        backgroundImage: "linear-gradient( 59deg, rgb(0 0 0) 0%, rgb(97 95 95) 50%, rgb(0 0 0) 100%)",
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: ".5rem"
    }
})(Box);