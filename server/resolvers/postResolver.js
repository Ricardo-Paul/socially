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
    createPost: async (_, { input: { image } }, {User, Post}) => {
        const { createReadStream, filename, mimetype, encoding } = await image;
        const stream = createReadStream(); // stream is the file itself
        const args = {
            stream,
            filename,
            mimetype,
            encoding
        }

        false && uploadToLocal(args); //disable local upload

        uploadToCloudinary(stream, "userpost");
        return "sor"
    }
}

export default {
    Query,
    Mutation
}