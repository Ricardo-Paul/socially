import generateToken from '../utils/generateToken';
import bcrypt from 'bcryptjs';
import ms from 'ms'
import { sendEmail } from '../utils/sendEmail';

const AUTH_TOKEN_EXPIRY = ms('1 day'); // token duration for signin/signup
const PASS_RESET_TOKEN_DURATION = '3600000' // 1 hour token duration while password-resetting

const Query = {
    username: () => 'Ricardo',

    getLoggedInUser: async (_, args, {loggedInUser, User}) => {
        // third arguments are returned form context by apolloServer
        // they are called context BTW
        if(!loggedInUser) throw new Error(`User not logged in`);
        const {email, username} = loggedInUser;
        const user = User.findOne({email, username});
        return user;
    }
}

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

        let signupToken = generateToken(newUser, AUTH_TOKEN_EXPIRY);
        return {
            signupToken
        };
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
        // TODO: compare password with then hashed one in the db
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword) throw new Error('Invalid password');

        let signinToken = generateToken(user, AUTH_TOKEN_EXPIRY);
        return {signinToken};
    },

    requestPassReset: async (root, {input: {email}}, {User}) => {
        const user = await User.findOne({ email });

        if(!user) {
            console.log('User not found')
            throw new Error(`Can't find user with email: ${email} on our system`);
        }

        const passwordResetToken = generateToken(user, PASS_RESET_TOKEN_DURATION);
        const passwordResetTokenExpiryDate = new Date(Date.now()) + PASS_RESET_TOKEN_DURATION;

        const updatedUser = await User.findOneAndUpdate(
            {_id: user.id},
            { passwordResetToken,
              passwordResetTokenExpiryDate
            },
            { new: true } //returns the document with the new update
        )

        const CLIENT_URL = 'http://localhost:3000';

        const mailOptions = {
            to: updatedUser.email,
            subject: 'Socially | Password Reset',
            html: `Click the following link to reset your password: 
            ${CLIENT_URL}/reset-password?email=${updatedUser.email}&&passwordResetToken=${updatedUser.passwordResetToken}`
        }

        sendEmail(mailOptions);
        return {
            message: `We have sent an email to: ${updatedUser.email}.
            Please check your inbox to continue with the password reset
            `
        }
    },

    resetPassword: async (root, {input: {email, passwordResetToken, password}} , {User}) => {
        if(!password) throw new Error('Please enter you new password');
        
        const shouldExpireAt = Date.now() - PASS_RESET_TOKEN_DURATION;

        const user = await User.findOne({email, passwordResetToken,
            passwordResetTokenExpiryDate: {
                $gte: shouldExpireAt
            }
        })
        if(!user) throw new Error('Not found');

        user.password = password;
        user.passwordResetToken = "";
        user.passwordResetTokenExpiryDate = "";

        user.save();

        sendEmail({
            to: updatedUser.email,
            subject: 'Successfully reset password',
            html: 'You have successfully reset your password'
        })
        return user;
    }
}

export default {
    Query,
    Mutation
}