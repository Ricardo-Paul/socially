import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/user";
import * as Routes from "../../routes";
import { Button, CssBaseline, Toolbar, Typography } from "@material-ui/core";

// styles
import { MainContainer } from "../../components/Layout";
import TextField from "../../components/TextField";
import AppBar from "../Auth/AuthHeader";
import { formStyles } from "../../styles/formStyles";

// utils
import validate from "../../utils/validate";

// routes
import { Link, withRouter } from "react-router-dom";
import { SIGNIN } from "../../routes";

const SignUp = ({ refetch, location, history }) => {
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
    if (error) {
      setError(error);
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
      // save signupToken in localstorate
      localStorage.setItem("token", response.data.signup.signupToken);
      refetch();
      history.push(Routes.HOME);
    } catch (error) {
      if (!error.graphQLErrors) {
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

  const classes = formStyles();

  return (
    <>
      <MainContainer>
        <CssBaseline />

        <div className={classes.paper}>
          {error}
          <Typography variant="h6" className={classes.signupText}>
            SIGN UP
          </Typography>
          <hr />

          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e, signup)}
          >
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
            <Button
              variant="contained"
              className={classes.submit}
              color="primary"
              type="submit"
            >
              Submit
            </Button>{" "}
            <br />
            <Typography>
              Already have an account? <Link to={SIGNIN}> Sign In</Link>
            </Typography>
          </form>
        </div>
      </MainContainer>
    </>
  );
};

export default withRouter(SignUp);
