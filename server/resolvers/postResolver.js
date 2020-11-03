import uploads from '../utils/fileUploads'

const { uploadToCloudinary, uploadToLocal } = uploads;

const Query = {
    postname: () => 'get postname',

    getPosts: async (_, { authUserId }, { Post }) => {
    // TODO: also search for posts where image is non-nul
    const query = { $and: [{ author: { $ne: authUserId }}] }

    // countDocument is applied directly on the query
    const posts = await Post.find(query);
    const count = await Post.find(query).countDocuments();

        return {
            posts,
            count
        }
    },
    getPost: async (_, { id }, { Post }) => {
        // remember to populate an instance to be able to 
        // query its value
        const post = await Post.findOne({ _id: id })
        .populate("author")

        return post
    },

    deletePost: async (_, { id }, { Post, authenticatedUser }) => {
        if(!authenticatedUser) throw new Error(`Unauthenticated`);

        const postToDelete = await Post.findOne({ _id: id})
        if(!postToDelete) throw new Error(`Post not found`)
        await Post.deleteOne({ _id: postToDelete._id })
        
        return "Post deleted"
    }
}

// any file sent is a promise that resolves an object:
// filename, mimetype, encoding, createReadStream

// createReadStream can be used to pipe the file
// to a local location or a cloud storage provider (S3, cloudinary)

// stream.pipe() takes a readable stream,
// connect it to a writable stream

const Mutation = {
    createPost: async (_, { input: { title, image, authorId } }, {authenticatedUser ,User, Post}) => {
        if(!authenticatedUser) throw new Error(`User not authenticated`);

        // it is required that we send the authorId
        // we cannot get it from the authenticatedUser
        // const authorId = User.findOne({email: authenticatedUser.email})._id; //no we can do that

        let newPost;
        if(image){
            const { createReadStream, filename, mimetype, encoding } = await image;
            const stream = createReadStream();
            const uploadedImage = await uploadToCloudinary(stream, "userpost");
            if(uploadedImage.secure_url){
                newPost = await new Post({
                    image: uploadedImage.secure_url,
                    imagePublicId: uploadedImage.public_id,
                    title,
                    author: User.findOne({email: authenticatedUser.email})._id
                }).save();
            } else {
                throw new Error(`Something went wrong while attempting to upload image`);
            }
        }

        newPost = await new Post({
            title,
            author: authorId
        }).save();

        // $push is an atomic operator
        await User.findOneAndUpdate({_id: authorId}, { $push: { posts: newPost.id } }) //or just posts: newPost
        console.log(await authenticatedUser);
        return newPost;
    }
}

export default {
    Query,
    Mutation
}

// reset posts to [] for specif user
// db.users.findOneAndUpdate({username:"ricky"}, { $set: {posts: []}})