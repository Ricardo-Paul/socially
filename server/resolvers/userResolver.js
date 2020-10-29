import models from '../models';

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
            return existedUser;
        }

        const createdUser = await new User({
            fullName,
            email,
            username,
            password
        }).save();
        return createdUser
    }
}

export default {
    Query,
    Mutation
}