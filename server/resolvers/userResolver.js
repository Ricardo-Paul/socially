import generateToken from '../utils/generateToken';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { sendEmail } from '../utils/sendEmail';
import Follow from '../models/Follow';
import { uploadToCloudinary } from '../utils/fileUploads';
import mongoose from 'mongoose';
import { sortBy } from 'lodash';

const AUTH_TOKEN_EXPIRY = ms('1 day'); // token duration for signin/signup
const PASS_RESET_TOKEN_DURATION = '3600000'; // 1 hour token duration while password-resetting

const Query = {
  /**
   * get current user
   */
  getAuthUser: async (_, args, { authenticatedUser, User, Message }) => {
    // third arguments are returned form context by apolloServer
    // they are called context BTW
    if (!authenticatedUser) return null;
    const { email, username } = authenticatedUser;
    const user = await User.findOne({ email, username })
      .populate('posts')
      .populate('likes')
      .populate('followers')
      .populate('following')
      .populate({
        path: 'notifications',
        populate: [
          { path: 'sender' },
          { path: 'follow' },
          { path: 'like', populate: { path: 'post' } },
          { path: 'comment', populate: { path: 'post' } },
        ],
        match: { seen: false },
      });

    // notice how we pick only seen:false notifications
    // those that will be displayed at the app bar

    // query the db for all unseen messages grouped by user
    // also add the user props with a lookup (join query)
    const lastUnseenMessages = await Message.aggregate([
      {
        $match: {
          receiver: mongoose.Types.ObjectId(user.id),
          seen: false,
        },
      }, //return 45 messages
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: '$sender', //group 45 messages by sender ( return 6 senders i an object ) {_id: senderId}
          s_doc: {
            // including not just the ids but the whole document held by the $$ROOT var {_id: '', s_doc: {seen: false, message: "hello"}}
            $first: '$$ROOT', // ['first message', 'last message'] $first:$$ROOT return the first message document
          }, //we pick $first accumulator to pick the last message because we have inverted the sorting
        },
      },
      {
        $replaceRoot: { newRoot: '$s_doc' },
      }, // merge the s_doc object into the parent object {_id: '', seen: false} now we dont have a nested object
      {
        $lookup: {
          //perform a join search
          localField: 'sender', //Message.sender field
          from: 'users', // User._id field (notice we use the db collection name)
          foreignField: '_id',
          as: 'sender',
        },
      },
    ]);

    //$lookup as: "sender" => this includes a sender array in the result. The array contains one object which is the sender we looked up from the "users" documents.

    // data form
    // [
    //   {
    //     id:"",
    //     seen: "",
    //     sender: [
    //       {
    //         _id:"",
    //         fullName:"",
    //         posts: [],
    //         comments: []
    //       }
    //     ],
    //      message: 'text'
    //   },
    //   {
    //     id:"",
    //     seen: "",
    //     sender: [
    //       {
    //         _id:"",
    //         fullName:"",
    //         posts: [],
    //         comments: []
    //       }
    //     ],
    //      message: 'text'
    //   }
    // ]

    let conversations = [];
    lastUnseenMessages.map((u) => {
      const sender = {
        id: u.sender[0]._id, //acess the only user object in the sender array
        fullName: u.sender[0].fullName,
        username: u.sender[0].username,
        image: u.sender[0].image,
        isOnline: u.sender[0].isOnline,
        lastMessage: u.message,
        lastMessageCreatedAt: u.createdAt,
      };

      conversations.push(sender);
    });

    // console.log('UNSEEN MESSAGES :', lastUnseenMessages, 'CONVERSATIONS :', conversations, user.id)
    // console.log('UNSEEN MESSAGES LENGTH :', lastUnseenMessages.length)

    const sortedConversations = conversations.sort((a, b) =>
      b.lastMessageCreatedAt.toString().localeCompare(a.lastMessageCreatedAt)
    );

    user.conversations = sortedConversations;
    // attaching a new prop to the user goes with adding that prop in the UserPayload schema
    // unseenMessages would have been a better name, just an after thought

    return user;
  },

  /**
   * get user by username
   *
   * @param {string} username
   */

  getUser: async (_, { username, userId }, { User }) => {
    if (username && userId) {
      throw new Error('Either search by username or userId');
    }

    if (!username && !userId) {
      throw new Error('username or userId required');
    }

    const query = username ? { username } : { _id: userId };
    const user = await User.findOne(query)
      .populate({
        path: 'posts',
        options: { sort: { createdAt: 'desc' } },
      })
      .populate('comments')
      .populate('likes')
      .populate('following')
      .populate('followers')
      .populate('notifications');

    if (!user) {
      throw new Error('User not found');
    }

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
  getUserPosts: async (_, { username, skip, limit }, { User, Post }) => {
    const user = await User.findOne({ username });

    const query = { author: user._id };
    const count = Post.find(query).countDocuments();

    // TODO: populate posts
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'author',
        populate: [{path: 'following'}, {path: 'followers'}]
      })
      .populate({
        path: 'comments',
        populate: { path: 'author' },
        options: {
          sort: { createdAt: 'desc' },
        },
      })
      .populate({
        path: 'likes',
        populate: 'user',
      })
      .skip(skip)
      .limit(limit);

    return {
      count,
      posts,
    };
  },
  /**
   * get all users the current user is not following
   */

  getUsers: async (_, { userId, skip, limit }, { User }) => {
    let followedUsers = []; //array of ids of celebrities the current user is following
    // we say celebrities here to make sense of the logic

    /**
     * find the instances where the user is the @follower
     * and select the celebrities he's following
     */
    // the second arg is a projection
    // we supress the _id from the result by setting it to 0
    const follow = await Follow.find({ follower: userId }, { _id: 0 }).select('follower');

    follow.map((f) => followedUsers.push(f.follower));
    const query = { $and: [{ _id: { $nin: followedUsers } }, { _id: { $ne: userId } }] };
    const count = await User.find(query).countDocuments();

    // TODO: populate posts
    const users = await User.find(query)
      .populate('following')
      .populate('followers')
      .populate('posts')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' });

    return {
      users,
      count,
    };
  },
  //
  /**
   * search for users by username or fullName
   */

  searchUsers: async (_, { searchQuery, limit = 50 }, { User }) => {
    if (!searchQuery) return [];

    // perform a sensitive search on the User collection
    let regexSearch = new RegExp(searchQuery, 'i');
    const query = { $or: [{ username: regexSearch }, { fullName: regexSearch }] };

    const users = User.find(query).limit(limit);

    const count = User.find(query).countDocuments();
    return users;
  },

  /**
   * suggest the user 6 people to follow
   *
   */
  suggestPeople: async (_, { userId }, { User, Follow }) => {
    const LIMIT = 6;
    // find the people the user is following
    const followedUsers = [];
    const follow = await Follow.find({ follower: userId }, { _id: 0 }).select('following');
    follow.map((f) => followedUsers.push(f.following)); //the array contains ids
    followedUsers.push(userId); // we'll also exclude the user from the suggestions

    const query = { _id: { $nin: followedUsers } };
    // await User.find(query).countDocuments();

    // skip a random amount of users from the total
    // and make sure we return only six
    // const random = Math.floor(Math.random() * usersCount);

    // let usersLeft = usersCount - random;
    // if(usersLeft < 6){
    //   random = random - ()
    // }

    // a quick one liner solution
    const usersFound = await User.find(query);
    let randomUsers = usersFound.sort(() => Math.random() - Math.random()).slice(0, LIMIT); //that will cut it

    return {
      users: randomUsers,
      count: randomUsers.length,
    };
  },

  /**
   * verify resetPassword token
   * by make sure it's the actual token and then
   * it's not yet expired
   */
  verifyResetPasswordToken: async (_, { email, token }, { User }) => {
    const user = await User.findOne({
      email,
      passwordResetToken: token,
      passwordResetTokenExpiryDate: { $gte: Date.now() - PASS_RESET_TOKEN_DURATION },
    });

    if (!user) throw new Error('token is either invalid or expired');
    return {
      message: 'verify token success',
    };
  },
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

    const CLIENT_URL = process.env.CLIENT_URL;

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

    // return user;
    let token = generateToken(user, AUTH_TOKEN_EXPIRY);
    return {
      token,
    };
  },

  /**
   * upload user photo
   * @param {string} userId
   * @param {obj} image the actual file
   * @param {imagePublicId} string image name, we'll overwrite the default public_id value provided by cloudinary
   */

  uploadUserPhoto: async (_, { input: { userId, image, imagePublicId, isCover } }, { User }) => {
    const { createReadStream } = await image;
    const stream = createReadStream();
    const uploadImage = await uploadToCloudinary(stream, 'user', imagePublicId);

    // set the photo as either image or cover image
    // based on client choice
    let fieldsToUpdate = {};
    if (uploadImage.secure_url) {
      if (isCover) {
        fieldsToUpdate.coverImage = uploadImage.secure_url;
        fieldsToUpdate.coverImagePublicId = uploadImage.public_id;
      } else {
        fieldsToUpdate.image = uploadImage.secure_url;
        fieldsToUpdate.imagePublicId = uploadImage.public_id;
      }
    }

    console.log('UPDATED FIELDS', fieldsToUpdate);

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...fieldsToUpdate },
        {
          new: true,
        }
      )
        .populate('posts')
        .populate('likes');

      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  Query,
  Mutation,
};
