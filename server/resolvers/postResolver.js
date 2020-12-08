// import Follow from '../models/Follow';
import cloudinary from 'cloudinary'
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/fileUploads';
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

  getFollowedPosts: async(_, {userId, skip, limit}, {Post, Follow}) => {
    // find the users that the current user is following

    let followedUsers = [];
    // find in Follow collection, documents where the follower is the user
    let follow = await Follow.find({ follower: userId });

    // push all the following(people the user is following) in the array
    follow.map((f) => followedUsers.push(f.following));

    // select in the post collecion all posts where the authors are in this array (followeUsers)
    // also where author is the current user
    const query = {$or: [{author: { $in: followedUsers }}, { author: userId }]};
    const postCount = Post.find(query).countDocuments();

    // TODO: populate the posts
    // TODO: seed db to test this method:: DONE
    const followedPosts = Post.find(query)
    .populate({
      path: 'author',
      populate: [
        { path: "following" },
        { path: "followers" },
        {  path: 'notifications',
        populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }],
        }
      ]
    })
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "author" }
    })
    .populate({
      path: "likes",
      populate:[
        {path: "user"},
        {path: "post"}
      ]
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: "desc" })

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

  deletePost: async (_, {input:{ id, imagePublicId} }, { Post, User,Comment, authenticatedUser }) => {
    if (!authenticatedUser) throw new Error(`Unauthenticated`);

    const postToDelete = await Post.findOne({ _id: id });
    if (!postToDelete) throw new Error(`Post not found`);
    await Post.deleteOne({ _id: postToDelete._id });

    // TODO: delete associated post picture on cloudinary
    if (imagePublicId) {
      try{
        const deletedImage = await deleteFromCloudinary(imagePublicId);
        console.log(deletedImage)
      } catch (err){
        console.log(err)
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
    return postToDelete;
  },
};

export default {
  Query,
  Mutation,
};

// reset posts to [] for specif user
// db.users.findOneAndUpdate({username:"ricky"}, { $set: {posts: []}})
