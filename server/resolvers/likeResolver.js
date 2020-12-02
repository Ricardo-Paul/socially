import { default as Notification} from './notiResolver';

const Mutation = {
  /**
   * check user authentication and create a like
   * 
   * @param {string} userId - id of the current user
   * @param {string} postId - id of the post to be liked
   * @returns {obj} a new like object
   */
  createLike: async (_, { input: { userId, postId, authorId } }, { User, Post, Like, authenticatedUser, Notification }) => {
    // TODO: put this logic in the middleware
    // an identical logic is described in getAuthUser query but will probably
    // used only on the client side
    const user = await User.findOne({ username: authenticatedUser.username });
    if (user.id !== userId) throw new Error(`Wrong token, please login and use the provided token`);

    const newLike = await new Like({
      user: userId,
      post: postId,
    }).save();

    if(userId != authorId){
      const newNotification = await new Notification({
        sender: userId,
        receiver: authorId,
        post: postId,
        like: newLike.id
      }).save();

    // set a notification for the post author
    await User.findOneAndUpdate({_id: authorId}, { $push: { notifications: newNotification._id} });
    }

    await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: newLike._id } });
    await User.findOneAndUpdate({ _id: userId }, { $push: { likes: newLike._id } });

    return newLike;
  },

  deleteLike: async (_, { input: { likeId } }, { User, Post, Like, Notification }) => {
    // according to the docs findOneAndRemove is deprecated
    const like = await Like.findOneAndDelete({ _id: likeId });
    if (!like) return;
    
    await User.findOneAndUpdate({ _id: like.user }, { $pull: { likes: like._id } });
    await Post.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like.id } });

    const notification = await Notification.findOneAndDelete({like: likeId});
    // remove from user collection
    await User.findOneAndUpdate({_id: notification.receiver}, {$pull: { notifications: notification._id}});

    return like;
  },
};

export default {
  Mutation,
};
