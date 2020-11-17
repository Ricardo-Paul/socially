import React, { useState } from 'react';
import { Mutation } from 'react-apollo'; //analogous to the useMutation react hook
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import { SIGNUP } from '../../graphql/user';

const SignUp = () => { 
    const [values, setValues] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });

    const { fullName, username, email, password } = values;
    console.log(Mutation, 'client:')
    // const [signup, { loading }] = useMutation(SIGNUP);
    
    // console.log(signup, 'loading: ', loading);

     return(<h3> OK </h3>)
}

export default withRouter(SignUp);