import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { formStyles } from "../../styles/formStyles";
import { MainContainer } from "../../components/Layout";
import TextField from "../../components/TextField";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as Routes from "../../routes";
import { REQUEST_PASS_RESET } from "../../graphql/user";
import AuthHeader from "./AuthHeader";

const ForgotPassword = () => {
  const text = `We will email you a link to reset your password`;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [subText, setSubText] = useState(text);
  const [requestPassReset, { loading }] = useMutation(REQUEST_PASS_RESET);

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError(`Please enter your email`);

    try {
      const result = await requestPassReset({
        variables: { input: { email } },
      });
      console.log(result);
      setSubText(`EMAIL SENT`);
      setError(result.data.requestPassReset.message);
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const classes = formStyles();

  return (
    <>
        <AuthHeader />

      <MainContainer>
        <div className={classes.paper}>
          {error}
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            REQUEST PASSWORD RESET
          </Typography>
          <Typography align="center" className={classes.subText}>
            {subText}
          </Typography>

          <form
            onSubmit={(e) => handleSubmit(e, requestPassReset)}
            className={classes.form}
          >
            <TextField
              label="email"
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              disabled={loading}
              type="submit"
              className={classes.submit}
              color="primary"
              variant="contained"
            >
              Request Password Reset
            </Button>{" "}
            <br />
            <Typography>
              <Link to={Routes.SIGNIN}>Let me retry to login</Link>
            </Typography>
          </form>
        </div>
      </MainContainer>
    </>
  );
};
export default ForgotPassword;
