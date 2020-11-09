const Mutation = {
  createComment: async (_, { input: { comment, authorId, postId } }, { Comment, User, Post, authenticatedUser }) => {
    if (!authenticatedUser) throw new Error(`Please login first`);

    const newComment = await new Comment({
      comment,
      author: authorId,
      post: postId,
    }).save();
    // pushing new comment to Post collection
    await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } });
    // pushing new comment to User collection
    await User.findOneAndUpdate({ _id: authorId }, { $push: { comments: newComment._id } });

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
