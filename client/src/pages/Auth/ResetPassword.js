import { useMutation, useQuery } from "@apollo/client";
import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components/Layout";
import { formStyles } from "../../styles/formStyles";
import TextField from "../../components/TextField";
import validate from "../../utils/validate";
import { RESET_PASSWORD, VERIFY_RESET_PASSWORD_TOKEN } from "../../graphql/user";

const ResetPassword = ({ location }) => {
  const url = new URLSearchParams(location.search);
  const email = url.get("email");
  const token = url.get("passwordResetToken");


  const [errors, setErrors] = useState("");

//   validate email and token
// error is the value returned,
// we assign it to the queryError variable
        const { _, error} =  useQuery(VERIFY_RESET_PASSWORD_TOKEN, {
            variables: {email, token}
        });

        const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);



  const [values, setValues] = useState({
    newPassword: "",
    passwordConfirmation: "",
  });
  const { newPassword, passwordConfirmation } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const result = await resetPassword({
            variables: {input: { email: "bfy", password:"huf", passwordResetToken:"hiuf"}}
        });
    
        console.log(resetPassword);
    } catch(error){
        console.log(error)
    }
    
  }

  const classes = formStyles();

  return (
    <>
      <MainContainer>
        <div className={classes.paper}>
          <Typography>RESET PASSWORD</Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e, resetPassword)} >
            <TextField
              variant="outlined"
              name="newPassword"
              value={newPassword}
              label="new password"
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              name="passwordConfirmation"
              value={passwordConfirmation}
              label="confirm password"
              onChange={handleChange}
            />
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              type="sumbit"
            >
              RESET PASSWORD
            </Button>
          </form>
        </div>
      </MainContainer>
    </>
  );
};

export default ResetPassword;
