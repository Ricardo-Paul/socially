import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../../graphql/user';

const SignIn = () => {

    const [values, setValues] = useState({
        emailOrUsername: "",
        password: ""
    });

    const { emailOrUsername, password } = values;
    const [ signin ] = useMutation(SIGN_IN);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await signin({
                variables: {input: { emailOrUsername, password }}
            });
            console.log(response.data);
        } catch(err){
            console.log(err.graphQLErrors[0].message)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        console.log(name, value);
    }

    return(
        <form onSubmit={(e) => handleSubmit(e, signin)}>
        username <input type="text" onChange={handleChange} name="emailOrUsername" value={emailOrUsername} />
        password <input type="password" onChange={handleChange} name="password" value={password} />
        <input type="submit" />
        </form>
    )
}

export default SignIn;