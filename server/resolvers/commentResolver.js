const Query = {
    getComment: ()=> 'get comment tested'
}

const Mutation = {
    createComment: async(_, { input: {comment, authorId, postId }}, {Comment, User, Post, authenticatedUser }) => {
        if(!authenticatedUser) throw new Error(`Please login first`);

        const newComment = await new Comment({
            comment,
            author: authorId,
            post: postId
        }).save();

        // pushing new comment to Post collection
        await Post.findOneAndUpdate({_id: postId}, { $push: { comments: newComment._id } });

        // pushing new comment to User collection
        await User.findOneAndUpdate({_id: authorId },{ $push: { comments: newComment._id } })

        return newComment
    }
}

export default{
    Query,
    Mutation
}