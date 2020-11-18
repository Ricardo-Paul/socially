import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP, MUT } from '../../graphql/user';

const SignUp = () => { 
    const [values, setValues] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });

    const [ signup ] = useMutation(SIGN_UP);
let data = {
    "input": {
      "fullName":"Jean be",
      "email":"bbfid@gmail.com",
      "username":"hfi",
      "password":"any"
    }
  }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit hit')
       
        try {
            const response = await signup({
                variables:{input:{ fullName:"He bn", email:"ricardopayl33@gmail.com", username:"rddwww", password:"ricardo00"}}
            });
            // localStorage.setItem('token', response.data.signup.token);
            console.log(response.data)
            // await refetch();
            // history.push(Routes.HOME);
          } catch (error) {
            // console.log(error.graphQLErrors[0].message);
            console.log(error)
          }

    };

        const handleChange = e => {
            const { name, value } = e.target;
            setValues({
                ...values,
                [name]: value
            })
            console.log(name, value)
        };

    const { fullName, username, email, password } = values;

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