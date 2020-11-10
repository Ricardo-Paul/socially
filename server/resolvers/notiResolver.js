
const Mutation = {
  createNotification: async(_, { input: { senderId, receiverId, postId, notificationType, notificationTypeId }}, { Notification, User }) => {
    console.log(typeof(notificationType), notificationType.toLowerCase())
    const newNotification = await new Notification({
      sender: senderId,
      receiver: receiverId,
      post: postId,
      [notificationType.toLowerCase()]: notificationTypeId
      // comment: comment.id
      // the notification is created when the comment is created
      // thus has access to the id
    }).save();

    console.log(newNotification._id)

    await User.findOneAndUpdate({_id: receiverId }, { $push: { notifications: newNotification._id } });
    return newNotification;
  },

  deleteNotification: async(_, {input: {notificationId}}, { User, Notification } ) => {
    const notification = await Notification.findOneAndRemove({_id: notificationId});
    console.log(notification, notificationId)
    // remove from user collection
    await User.findOneAndUpdate({_id: notification.receiver}, {$pull: { notifications: notification._id}});
    return notification;
  },

  /**
   * Updates all of the user notifications as seen:true
   * we do not target a particular notification
   * but a particular user - the receiver in our logic
   */
  updateNotificationSeen: async (_, {input: {receiverId}}, {Notification}) => {
    try{
      /**
       * update several
       */
      await Notification.update({receiver: receiverId, seen: false}, {seen: true}, {multi: true});
      return true;
    } catch(e){
      return false;
    }
  }
};

export default {
  Mutation,
};
