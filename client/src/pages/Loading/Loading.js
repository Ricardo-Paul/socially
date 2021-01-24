import React from "react";
import Logo from "../../assets/logo.svg"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types";

const useStyles = makeStyles({
    container: {
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ffffff"
    },
    logo: {
        width: "4rem",
        height: "4rem",
        marginBottom: "0.5rem"
    }
})

const Loading = ({ text }) => {
    const classes = useStyles();

    return(
        <div className={classes.container}> 
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