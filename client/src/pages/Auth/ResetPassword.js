import { useQuery } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { MainContainer } from '../../components/Layout';
import { formStyles } from '../../styles/formStyles';
import TextField from '../../components/TextField';
import validate from '../../utils/validate';

const ResetPassword = ({ location }) => {
    const url = new URLSearchParams(location.search);
    const email = url.get('email');
    const passwordResetToken = url.get('passwordResetToken');

    const [values, setValues] = useState({
        newPassword: "",
        passwordConfirmation:""
    })
    const {newPassword, passwordConfirmation} = values;

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        console.log(name, value)
    }

    const classes = formStyles();

    return(
        <>
        <MainContainer>

            <div className={classes.paper}>
                <Typography>
                    RESET PASSWORD
                </Typography>
                <form className={classes.form}>
                    <TextField variant="outlined" name="newPassword" value={newPassword} label="new password" onChange={handleChange} />

                    <TextField variant="outlined" name="passwordConfirmation" value={passwordConfirmation} label="confirm password" onChange={handleChange} />
                    <Button className={classes.submit} variant="contained" color="primary">
                        RESET PASSWORD
                    </Button>
                </form>
            </div>
        </MainContainer>
        </>
    )
}

export default ResetPassword;