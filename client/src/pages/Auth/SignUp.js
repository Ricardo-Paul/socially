import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../graphql/user';

const SignUp = () => { 
    const [values, setValues] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });
    const { fullName, username, email, password } = values;
    const [ signup, { loading, error } ] = useMutation(SIGN_UP);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit hit')
        try {
            const response = await signup({
                variables: {input: {
                  fullName, username, email, password
                }}
            });
            console.log(response.data)
            console.log(`response: ${response.data},
              loading: ${loading},
              error: ${error}
            `);
          } catch (error) {
            console.log(error.graphQLErrors[0].message);
          }
    };

        const handleChange = e => {
            const { name, value } = e.target;
            setValues({
                ...values,
                [name]: value
            })
        };

     return(
         <form onSubmit={(e) => handleSubmit(e, signup)}>
            fullName <input type="text" onChange={handleChange} name="fullName" value={fullName} />
             email <input type="text" onChange={handleChange} name="email" value={email} />
             username <input type="text" onChange={handleChange} name="username" value={username} />
             password <input type="password" onChange={handleChange} name="password" value={password} />
             <input type="submit" />
         </form>
     )
}

export default SignUp;