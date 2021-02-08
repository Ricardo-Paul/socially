const Mutation = {
  /**
   * create a relationship between user following/ user followed
   *
   * @params {string} currentUserId the current user
   * @params {string} followedUserId the followed user id
   */

  //  the user that send the request is following
  // in other words the active user
  createFollow: async (_, { input: { currentUserId, followedUserId } }, { Follow, User }) => {
    const follow = await Follow.findOne({ following: followedUserId, follower: currentUserId });
    if(follow) throw new Error(`You're already following this user`);

    const newFollow = await new Follow({
      following: followedUserId,
      follower: currentUserId,
    }).save();

    // const user = await User.findOne({ _id: currentUserId });


    // push the relationship to the followedUser
    await User.findOneAndUpdate({ _id: followedUserId }, { $push: { followers: newFollow._id } });
    // push the relationship to the current user
    await User.findOneAndUpdate({ _id: currentUserId }, { $push: { following: newFollow._id } });

    return newFollow;
  },

  /**
   * delete a follow/following relationship
   *
   * @params {string} followId
   */

  deleteFollow: async (_, { input: { followId } }, { Follow, User }) => {
    const followToRemove = await Follow.findOneAndRemove({ _id: followId });
    if (!followToRemove) throw new Error(`cant perfor unfollowing, not found`);

    // remove it from the followed user
    await User.findOneAndUpdate({ _id: followToRemove.follower }, { $pull: { following: followToRemove._id } });

    // remove it from current user
    await User.findOneAndUpdate({ _id: followToRemove.following }, { $pull: { followers: followToRemove._id } });

    return followToRemove;
  },
};

export default {
  Mutation,
};
