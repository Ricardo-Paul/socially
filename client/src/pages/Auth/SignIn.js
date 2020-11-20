import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../graphql/user";
import * as Routes from "../../routes";

// components
import TextField from "../../components/TextField";
import AppBar from "../../components/App/AppBar";
import { Button, Toolbar, Typography } from "@material-ui/core";
import { MainContainer } from "../../components/Layout";
import { formStyles } from "../../styles/formStyles";
import { Link } from "react-router-dom";

const SignIn = ({ refetch }) => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    emailOrUsername: "",
    password: "",
  });

  const { emailOrUsername, password } = values;
  const [signin] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({
        variables: { input: { emailOrUsername, password } },
      });
      refetch();
      console.log(response.data);
      localStorage.setItem('token', response.data.signin.signinToken);
      setError("")
    } catch (err) {
      console.log(err)
      console.log(err.graphQLErrors[0].message);
      setError(err.graphQLErrors[0].message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };

  const classes = formStyles();

  return (
    <>
      <AppBar>
        <Toolbar>Export Toolbar</Toolbar>
      </AppBar>

      <MainContainer>
        <div className={classes.paper}>
          {error}
          <Typography variant="h6">SIGN IN</Typography>
          <form
            onSubmit={(e) => handleSubmit(e, signin)}
            className={classes.form}
          >
            <TextField
              type="text"
              onChange={handleChange}
              name="emailOrUsername"
              value={emailOrUsername}
              variant="outlined"
              label="username or email"
            />
            <TextField
              type="password"
              onChange={handleChange}
              name="password"
              value={password}
              variant="outlined"
              label="password"
            />
            <Button
              className={classes.submit}
              variant="contained"
              type="submit"
              color="primary"
            >
              LOGIN
            </Button>{" "}
            <br />
            <Typography>
              Don't have an acount? <Link to={Routes.HOME}> Sign up </Link>
            </Typography>
            <Typography>
              Forgot Password ?{" "}
              <Link to={Routes.FORGOT_PASSWORD}> Reset Password </Link>
            </Typography>
          </form>
        </div>
      </MainContainer>
    </>
  );
};

export default SignIn;
