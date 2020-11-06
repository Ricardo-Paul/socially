
const Mutation = {
    createLike: async (_, { input: {userId, postId}}, { User, Post, Like, authenticatedUser}) => {
        console.log(authenticatedUser);

        const user = await User.findOne({ username: authenticatedUser.username });
        if(user.id !== userId) throw new Error(`Wrong token, please login and use the provided token`)

        const newLike = await new Like({
            user: userId,
            post: postId
        }).save();

        await Post.findOneAndUpdate({ _id: postId },{ $push: { likes: newLike._id } });
        await User.findOneAndUpdate({ _id: userId}, { $push: { likes: newLike._id } });

        return newLike;
    }
}

export default {
    Mutation
}