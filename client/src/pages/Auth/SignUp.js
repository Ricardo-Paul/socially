import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/user";

/**
 * styles imports
 */
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";

import MuiAlert from '@material-ui/lab/Alert'

import TextField from '../../components/TextField';
import AppBar from '../../components/App/AppBar';

import validate from '../../utils/validate';

const useStyles = makeStyles((theme) => ({
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
        marginTop: theme.spacing(2)
    },
    signupText:{
        marginTop: theme.spacing(1),
        marginBottom: -10
    }
}));

const SignUp = () => {
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { fullName, username, email, password } = values;
  const [signup, { loading }] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate(values);
    if(error){
        setError(error)
        return false;
    }

    try {
      const response = await signup({
        variables: {
          input: {
            fullName,
            username,
            email,
            password,
          },
        },
      });
      console.log(response.data);
      setError("");
      console.log(`response: ${response.data},
              loading: ${loading},
              error: ${error}
            `);
    } catch (error) {
        if(!error.graphQLErrors){
            return;
        }
        setError(error.graphQLErrors[0].message);
        console.log(error.graphQLErrors[0].message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const classes = useStyles();

  return (
    <>
    <AppBar>
        <Toolbar>
            Socially
        </Toolbar>
    </AppBar>

      <Container style={{ marginTop:"10%"}}>
        <CssBaseline />
        { error && <MuiAlert severity="error" elevation={6}>
            {error}
        </MuiAlert>}

        <div className={classes.paper}>
        <Typography variant="h6" className={classes.signupText}>
            SIGN UP
        </Typography>
        <hr/>

        <form className={classes.form} onSubmit={(e) => handleSubmit(e, signup)}>
            <TextField
            type="text"
            onChange={handleChange}
            name="fullName"
            value={fullName}
            variant="outlined"
            label="Fullname"
          />

          <TextField
            type="text"
            onChange={handleChange}
            name="email"
            value={email}
            variant="outlined"
            label="email"
          />

          <TextField
            type="text"
            onChange={handleChange}
            name="username"
            value={username}
            label="User name"
            variant="outlined"
          />

          <TextField
            type="password"
            onChange={handleChange}
            name="password"
            value={password}
            label="password"
            variant="outlined"
          />

          <Button variant="contained" className={classes.submit} color="primary" type="submit">
            Submit
          </Button>
        </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
