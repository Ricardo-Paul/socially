import Follow from '../models/Follow';
import cloudinary from 'cloudinary'
import { uploadToLocal, uploadToCloudinary } from '../utils/fileUploads';
const generateUniqueId = require('generate-unique-id');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

const Query = {
  postname: () => 'get postname',

  getPosts: async (_, { authUserId, skip, limit }, { Post }) => {
    // TODO: also search for posts where image is non-nul
    // that's why the $and operator
    const query = { $and: [{ author: { $ne: authUserId } }] };

    // countDocument is applied directly on the query
    const posts = await Post.find(query).skip(skip).limit(limit);
    const count = await Post.find(query).countDocuments();

    return {
      posts,
      count,
    };
  },
  getPost: async (_, { id }, { Post }) => {
    // remember to populate an instance to be able to
    // query its value
    const post = await Post.findOne({ _id: id }).populate('author');

    return post;
  },

  /**cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

   * Find the posts the current user is following
   * 
   * @param {string} userId the current user
   */

  getFollowedPosts: async(_, {userId, skip, limit}, {Post, User}) => {
    // find the users that the current user is following

    let followedUsers = [];
    let follow = await Follow.find({ following: userId }, {_id: 0}).select("follower");
    // we suppress the id so we're dealing with two fields now { follower, following }
    // these are instances where the user is the following //refer to the followResolver
    // we only select the follower field, people that the user is following

    // push these celebrities in the array (this name helps identify)
    follow.map((f) => followedUsers.push(f.follower));

    // select in the post collecion all posts where the authors are in this array (followeUsers)
    // also where author is the current user
    const query = {$or: [{author: { $in: followedUsers }}, { author: userId }]};
    const postCount = Post.find(query).countDocuments();

    // TODO: populate the posts
    // TODO: seed db to test this method
    const followedPosts = Post.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "desc" })
    .populate("author")
    .populate("comments")
    .populate("likes")

    return{
      count: postCount,
      posts: followedPosts
    }
  }
};

// any file sent is a promise that resolves an object:
// filename, mimetype, encoding, createReadStream

// createReadStream can be used to pipe the file
// to a local location or a cloud storage provider (S3, cloudinary)

// stream.pipe() :: pipe() pipes a readable streamuploadToCloudinary
// to a writable stream

const Mutation = {
  createPost: async (_, { input: { title, image, authorId } }, { User, Post }) => {
    if (!title && !image) {
      throw new Error('Post title or image is required.');
    }

    // always remember to catch error

    let imageUrl, imagePublicId;
    if (image) {
      const { createReadStream } = await image;
      const stream = createReadStream();
      try{
        const upload = await uploadToCloudinary(stream, 'postimages', generateUniqueId());
        if(upload.secure_url){
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      } catch(err){
        console.log(err)
      }
    }

    const newPost = await new Post({
      title,
      image: imageUrl,
      imagePublicId,
      author: authorId,
    }).save();

    await User.findOneAndUpdate({ _id: authorId }, { $push: { posts: newPost.id } });

    return newPost;
  },

  deletePost: async (_, { id, imagePublicId }, { Post, User, authenticatedUser }) => {
    if (!authenticatedUser) throw new Error(`Unauthenticated`);

    const postToDelete = await Post.findOne({ _id: id });
    if (!postToDelete) throw new Error(`Post not found`);
    await Post.deleteOne({ _id: postToDelete._id });

    // TODO: delete associated post picture on cloudinary
    if (imagePublicId) {
      const deletedImage = await deleteFromCloudinary(imagePublicId);
      if (deletedImage.result != 'ok') {
        throw new Error(`Something went wrong while trying to delete image`);
      }
    }

    // TODO: pull the post out of author collection
    await User.findOneAndUpdate({ _id: postToDelete.author }, { $pull: { posts: postToDelete._id } });

    // TODO: delete comments associated to the post from Comment collection
    await Comment.find({ post: postToDelete._id }).deleteMany();

    // TODO: delete post comments from user collection

    // take all the comments id from the post
    // check them against the comments in the user collection
    postToDelete.comments.map(async (commentId) => {
      await User.where({ comments: commentId }).update({ $pull: { comments: commentId } });
    });

    // delete post likes from user collection
    postToDelete.likes.map(async (likeId) => {
      await User.where({ likes: likeId }).update({ $pull: { likes: likeId } });
    });

    // post has likes - user has likes
    // take the likes id from post post.likes.map(likeId)
    // now check in User where likes have this id User.where({ likes: likeId })

    // TODO: remove notifications (upcoming)
    return 'Post deleted';
  },
};

export default {
  Query,
  Mutation,
};

// reset posts to [] for specif user
// db.users.findOneAndUpdate({username:"ricky"}, { $set: {posts: []}})
