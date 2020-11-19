const { makeStyles } = require("@material-ui/core");

export const formStyles = makeStyles((theme) => ({
    paper:{
        paddingTop: theme.spacing(4),
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
    },
    form:{
        display: "flex",
        flexDirection: "column",
        width: "35%",
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        }
    },
    submit: {
        marginTop: theme.spacing(2),
        color: theme.palette.secondary.main,
        [theme.breakpoints.up('md')]: {
            height: '45px'
        }
    },
    signupText:{
        marginTop: theme.spacing(1),
        marginBottom: -10,
    },
    subText: {
        color: theme.palette.primary.light
    }
}));