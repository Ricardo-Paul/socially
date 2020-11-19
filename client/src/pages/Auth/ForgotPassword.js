import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { formStyles } from "../../styles/formStyles";
import { MainContainer } from "../../components/Layout";
import TextField from "../../components/TextField";
import { Button, Typography } from "@material-ui/core";
import { theme } from "../../utils/theme";
import { Link } from "react-router-dom";
import { SIGNIN } from "../../routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [ requestPassReset, {loading}] = useMutation()
  const requestPassReset = () => {

  }

  const handleSubmit = () => {

  }

  const classes = formStyles();

  return (
    <>
    <MainContainer>
      <div className={classes.paper}>
      <Typography variant="h6" style={{marginBottom: "20px"}}>
        REQUEST PASSWORD RESET
      </Typography>
      <Typography align="center" className={classes.subText}>
        Enter your email below, <br/> we will email you a link to reset your password
      </Typography>
      <form onSubmit={(e) => handleSubmit(e, requestPassReset)} className={classes.form}>
        <TextField label="email"variant="outlined" type="email" name="email" value={email} />
        <Button className={classes.submit} color="primary" variant="contained">
          Request Password Reset
        </Button> <br />

        <Typography>
        <Link to={SIGNIN}>
          I want to retry
        </Link>
      </Typography>
      </form>
      </div>
    </MainContainer>
    </>
  );
};
export default ForgotPassword;
