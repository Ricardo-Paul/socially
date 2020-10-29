import models from '../models';
import getUserToken from '../utils/getUserToken';


const Query = {
    username: () => 'Ricardo'
}

// TODO: add password confirmation
// send email for account verification

const Mutation = {
    signup: async (root, { input: { fullName, email, username, password }}, { User }) => {
        // make sure email or username is unique
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })

        if(existedUser){
            const fieldValue = existedUser.username === username?username: email
            throw new Error(`User with ${fieldValue} already existed`);
        }

        // make sure all required values are provided
        // this is also  handled in the SignupInput schema
        if(!fullName || !email || !username || !password){
            throw new Error('Please provide a value for each field');
        }
        if(fullName.length > 20){
            throw new Error('Fullname can\'t be longer thant 20 characters')
        }
        // TODO: validate username with regex

        const newUser = await new User({
            fullName,
            email,
            username,
            password
        }).save();

        let signupToken = getUserToken(newUser);
        return {signupToken};
        //important for return value to be an object to fit the schema
        // type Token{ signupToken }
    },

    signin: async(root, { input: {emailOrUsername, password} }, { User }) => {

        const user = await User.findOne({
            $or: [
                {email: emailOrUsername},
                {username: emailOrUsername}
            ]
        });
        if(!user){
            throw new Error('User not found');
        }
    }
}

export default {
    Query,
    Mutation
}