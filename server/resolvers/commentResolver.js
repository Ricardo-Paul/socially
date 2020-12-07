import { withFilter } from "apollo-server";
import { NOTIFICATION_CREATED_OR_DELETED } from "../constants/Subscriptions";
import { pubSub } from "../utils/apolloServer";
import Models from '../models';
const User = Models.User;

const Mutation = {
  createComment: async (_, { input: { comment, authorId, postId } }, { Comment, User, Post, authenticatedUser, Notification }) => {
    if (!authenticatedUser) throw new Error(`Please login first`);
    const commentAuthorId = authorId;

    const newComment = await new Comment({
      comment,
      author: commentAuthorId, // the comment author
      post: postId,
    }).save();
    // pushing new comment to Post collection
    await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } });
    // pushing new comment to User collection
    await User.findOneAndUpdate({ _id: commentAuthorId }, { $push: { comments: newComment._id } });

    // create notification
    // find post author
    const post = await Post.findOne({ _id: postId}) // the post author
    console.log('POST AUTHOR', post.author);

    if(commentAuthorId != post.author){
      let newNotification = await new Notification({
        sender: commentAuthorId,
        receiver: post.author,
        comment: newComment._id,
        post: postId
      }).save();
      // set a notification for the post author
      await User.findOneAndUpdate({_id: post.author}, { $push: { notifications: newNotification._id } });

      newNotification = await newNotification
        .populate("sender")
        .populate("follow")
        .populate({path: "comment", populate: { path: "post" }})
        .populate({ path: "like", populate: { path: "post" } })
        .execPopulate();

      // publish the notification creation event
      pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
        // our payload
        notificationCreatedOrDeleted: {
          operation: 'CREATE',
          notification: newNotification
        }
      })
    }

    return newComment;
  },

  deleteComment: async (_, { input: { commentId } }, { User, Post, Comment, Notification }) => {
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    if (!comment) throw new Error(`not found`);

    await Post.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: comment._id } });
    await User.findOneAndUpdate({ _id: comment.author }, { $pull: { comments: comment._id } });

    // delete associated notification
    const post = await Post.findOne({ _id: comment.post});
    if(comment.author != post.author){
      const notification = await Notification.findOneAndDelete({comment: comment._id});
      await User.findOneAndUpdate({ _id: notification.receiver }, { $pull: { notifications: notification._id } });

      // publish the notification deletion event
      pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
        // our payload
        notificationCreatedOrDeleted: {
          operation: "DELETE",
          notification: notification
        }
      })
    }

    return comment;
  },
};

// Subscriptions are also a root level type
// like Query and Mutation

// use function to filter the subscriptions
const Subscription = {
  notificationCreatedOrDeleted: {
    subscribe: withFilter(
      () => pubSub.asyncIterator(NOTIFICATION_CREATED_OR_DELETED),
      // the filter function is executed with payload, var and context
      // and must return a boolean to know if we should pass the payload
      // to the subscriber
      async (payload, variables, { authenticatedUser }) => {
        // make sure the user receiving the notification is (active) 
        const receiverId = payload.notificationCreatedOrDeleted.notification.receiver.toString();

        const authUser = await User.findOne({email: authenticatedUser.email});
        return authUser && authUser.id === receiverId;
      }
    )
  }
};
export default {
  Mutation,
  Subscription
};
