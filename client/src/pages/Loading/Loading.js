import React from "react";
import Logo from "../../assets/logo.svg"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types";
import { CircularProgress, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    },
    progress: {
        color: theme.palette.primary.contrastText
    }
}))

const Loading = ({ text }) => {
    const classes = useStyles();
    const theme = useTheme();

    const style = {
        backgroundColor: theme.palette.primary.dark
    }

    return(
        <div style={style} className={classes.container}> 
            <CircularProgress variant="indeterminate" className={classes.progress} />
        </div>
    )
};

Loading.propTypes = {
    text: PropTypes.string
}

export default Loading;