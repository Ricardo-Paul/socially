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
    const postAuthorId = await Post.findOne({ _id: postId}) // the post author
    console.log('POST AUTHOR', postAuthorId.author);

    if(commentAuthorId != postAuthorId.author){
      const newNotification = await new Notification({
        sender: commentAuthorId,
        receiver: postAuthorId.author,
        comment: newComment._id,
        post: postId
      }).save();

      // set a notification for the post author
      await User.findOneAndUpdate({_id: postAuthorId.author}, { $push: { notifications: newNotification._id } });
    }

    return newComment;
  },

  deleteComment: async (_, { input: { commentId } }, { User, Post, Comment }) => {
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    if (!comment) throw new Error(`not found`);

    await Post.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: comment._id } });
    await User.findOneAndUpdate({ _id: comment.author }, { $pull: { comments: comment._id } });

    return comment;
  },
};

export default {
  Mutation,
};
