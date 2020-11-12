import generateToken from '../utils/generateToken';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { sendEmail } from '../utils/sendEmail';
import Follow from '../models/Follow';
import { map } from 'lodash';

const AUTH_TOKEN_EXPIRY = ms('1 day'); // token duration for signin/signup
const PASS_RESET_TOKEN_DURATION = '3600000'; // 1 hour token duration while password-resetting

const Query = {
  /**
   * get current user
   */
  getAuthUser: async (_, args, { authenticatedUser, User }) => {
    // third arguments are returned form context by apolloServer
    // they are called context BTW
    if (!authenticatedUser) throw new Error(`User not logged in`);
    const { email, username } = authenticatedUser;
    const user = User.findOne({ email, username });
    return user;
  },

  /**
   * get user by username
   * 
   * @param {string} username
   */

  getUser: async (_, { username }, { User }) => {
    const user = await User.findOne({ username })
      .populate({
        path: 'posts',
        options: { sort: { createdAt: 'desc' } },
      })
      .populate('comments')
      .populate('likes');

    return user;
  },

  /**
   * get user posts
   * @param {string} username
   * @param {number} skip how many posts to skip
   * @param {number} limit how many posts to fetch
   * 
   */

  //  not yet tested
   getUserPosts: async(_, {username, skip, limit}, {User, Post}) => {
    const user = await User.findOne({username});

    const query = { author: user._id };
    const count = Post.find(query).countDocuments();

    // TODO: populate posts
    const posts = await Post.find({ author: user._id })
    .populate("author")
    .skip(skip)
    .limit(limit);

    return{
      count,
      posts
    }
   },
  /**
   * get all users the current user is not following
   */

  getUsers: async(_, {userId, skip, limit}, { User }) => {
    let followedUsers = []; //array of ids of celebrities the current user is following
    // we say celebrities here to make sense of the logic
    
    /**
     * find the instances where the user is the @follower
     * and select the celebrities he's following
     */
    // the second arg is a projection
    // we supress the _id from the result by setting it to 0
    const follow = await Follow.find({ follower: userId }, {_id: 0}).select("following");

    follow.map(f => followedUsers.push(f.follower));
    const query = { $and:[{ _id: { $nin: followedUsers } }, { _id: { $ne: userId } }] }
    const count = User.find(query).countDocuments();

    // TODO: populate posts
    const users = User.find(query)
    .populate("posts")
    .skip(skip)
    .limit(limit)

    return{
      users, 
      count
    }
  },

  /**
   * search for users by username or fullName
   */

   searchUsers: async(_, {searchQuery, limit=50}, {User}) => {
    if(!searchQuery) return [];

    // perform a sensitive search on the User collection
    let regexSearch = new RegExp(searchQuery, "i");
    const query = {$or: [{username: regexSearch}, {fullName: regexSearch }]};

    const users = User.find(query)
    .limit(limit)

    const count = User.find(query).countDocuments();
    return users;
   },

   /**
    * suggest the user 6 people to follow
    * 
    */
   suggestPeople: async(_, {userId}, {User, Follow}) => {
    // find the people the user is following
    const followedUsers = [];
    const follow = await Follow.find({ follower: userId }, {_id: 0}).select("following");
    follow.map((f) => followedUsers.push(f.following));
   }

};

const Mutation = {
  signup: async (root, { input: { fullName, email, username, password } }, { User }) => {
    // make sure email or username is unique
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      const fieldValue = existedUser.username === username ? username : email;
      throw new Error(`User with ${fieldValue} already existed`);
    }

    // make sure all required values are provided
    // this is also  handled in the SignupInput schema
    if (!fullName || !email || !username || !password) {
      throw new Error('Please provide a value for each field');
    }
    if (fullName.length > 20) {
      throw new Error("Fullname can't be longer thant 20 characters");
    }
    // TODO: validate username with regex

    const newUser = await new User({
      fullName,
      email,
      username,
      password,
    }).save();

    let signupToken = generateToken(newUser, AUTH_TOKEN_EXPIRY);
    return {
      signupToken,
    };
  },

  signin: async (root, { input: { emailOrUsername, password } }, { User }) => {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      throw new Error('User not found');
    }
    // TODO: compare password with then hashed one in the db
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error('Invalid password');

    let signinToken = generateToken(user, AUTH_TOKEN_EXPIRY);
    return { signinToken };
  },

  requestPassReset: async (root, { input: { email } }, { User }) => {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      throw new Error(`Can't find user with email: ${email} on our system`);
    }

    const passwordResetToken = generateToken(user, PASS_RESET_TOKEN_DURATION);
    const passwordResetTokenExpiryDate = new Date(Date.now()) + PASS_RESET_TOKEN_DURATION;

    const updatedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { passwordResetToken, passwordResetTokenExpiryDate },
      { new: true } //returns the document with the new update
    );

    // TODO: move declaration to .env
    const CLIENT_URL = 'http://localhost:3000';

    const mailOptions = {
      to: updatedUser.email,
      subject: 'Socially | Password Reset',
      html: `Click the following link to reset your password: 
            ${CLIENT_URL}/reset-password?email=${updatedUser.email}&&passwordResetToken=${updatedUser.passwordResetToken}`,
    };

    sendEmail(mailOptions);
    return {
      message: `We have sent an email to: ${updatedUser.email}.
            Please check your inbox to continue with the password reset
            `,
    };
  },

  resetPassword: async (root, { input: { email, passwordResetToken, password } }, { User }) => {
    if (!password) throw new Error('Please enter you new password');

    const shouldExpireAt = Date.now() - PASS_RESET_TOKEN_DURATION;

    const user = await User.findOne({
      email,
      passwordResetToken,
      passwordResetTokenExpiryDate: {
        $gte: shouldExpireAt,
      },
    });
    if (!user) throw new Error('Not found');

    user.password = password;
    user.passwordResetToken = '';
    user.passwordResetTokenExpiryDate = '';

    user.save();

    sendEmail({
      to: user.email,
      subject: 'Successfully reset password',
      html: 'You have successfully reset your password',
    });
    return user;
  },
};

export default {
  Query,
  Mutation,
};
