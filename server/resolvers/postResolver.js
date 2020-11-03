import uploads from '../utils/fileUploads'

const { uploadToCloudinary, uploadToLocal } = uploads;

const Query = {
    postname: () => 'get postname'
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

        await User.findOneAndUpdate({_id: authorId}, { $push: { posts: newPost } }) //push post to user
        console.log(await authenticatedUser);
        return newPost;
    }
}

export default {
    Query,
    Mutation
}