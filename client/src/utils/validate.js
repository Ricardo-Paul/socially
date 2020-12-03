
/**
 * validate input fields
 * returns one error at a time
 * 
 * @param {obj} fields 
 */


const validate = fields => {
    const { fullName, email, username, password } = fields;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

    // fields should not be empty
    if(!fullName || !email || !username || !password){
        return `Please provide a value for each field`;
    }

    // email should be valid
    if(!emailRegex.test(String(email).toLocaleLowerCase())){
        return `Invalid email`
    }

    if(!usernameRegex.test(String(username))){
        return `You may have entered some invalid characters for your username`
    } else if(username.length > 15 || fullName.length > 15){
        return `Username and full Name can't contain more than 15 characters`
    }

    if(password.length < 7){
        return `Password should be at least 7 characters`
    }

    return false;
}

export default validate;