const fs = require('fs');
const path = require('path');

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
        console.log(image)

        const { createReadStream, filename, mimetype, encoding } = await image;

        console.log(path.join('dirname:', __dirname, '../public/uploads'));
        const stream = createReadStream();
        const uploadsPath = path.join(__dirname, '../public/');

         new Promise((resolve, reject) => {
            stream.pipe(fs.createWriteStream(uploadsPath))
            .on('finish', () => {
                console.log(
                    {
                        message: 'Sucess',
                        location: uploadsPath,
                        filename, mimetype, encoding
                    }
                );
                resolve({
                    message: 'Sucess',
                    location: uploadsPath,
                    filename, mimetype, encoding
                })
            })
        })

        return "sor"
    }
}

export default {
    Query,
    Mutation
}