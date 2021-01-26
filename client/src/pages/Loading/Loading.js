import React from "react";
import Logo from "../../assets/logo.svg"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    logo: {
        width: "4rem",
        height: "4rem",
        marginBottom: "0.5rem"
    }
})

const Loading = ({ text }) => {
    const classes = useStyles();
    const theme = useTheme();

    const style = {
        backgroundColor: theme.palette.primary.dark
    }

    return(
        <div style={style} className={classes.container}> 
            <img className={classes.logo} src={Logo} />
            {text &&
            <Box fontFamily="monospace">
                {/* { text } ... */}
            </Box>}
        </div>
    )
};

Loading.propTypes = {
    text: PropTypes.string
}

export default Loading;