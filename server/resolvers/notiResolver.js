

const Mutation = {
  createNotification: async(_, { input: { senderId, receiverId, postId, notificationType }}, { Notification, User }) => {
    const newNotification = new Notification({
      sender: senderId,
      receiver: receiverId,
      post: postId,
      [notificationType.toLowercase()]: notificationTypeId
      // sending notificationType as ty enum breaks the code
    }).save();

    await User.findOneAndUpdate({_id: receiverId}, { $push: { notifications: newNotification._id } });
    return newNotification;
  },

  deleteNotification: async(_, { input: {}}, {}) => {

  }
};


export default {
  Mutation,
};
