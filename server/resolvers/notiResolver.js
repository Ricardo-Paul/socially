const Query = {
  getUserNotifications: async (_, { userId, skip, limit }, { Notification }) => {
    const query = { receiver: userId };
    const count = await Notification.where(query).countDocuments();

    const notifications = await Notification.where(query)
      .populate('sender')
      .populate('receiver')
      .populate('follow')
      .populate({ path: "comment", populate: { path: "post" } })
      .populate({ path: "like", populate: { path: "post" } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" })

      return { notifications, count }
  }
}


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

    await User.findOneAndUpdate({_id: receiverId }, { $push: { notifications: newNotification._id } });
    return newNotification;
  },

  deleteNotification: async(_, {input: {notificationId}}, { User, Notification } ) => {
    const notification = await Notification.findOneAndRemove({_id: notificationId});
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
  Query
};
