
const Query = {
    postname: () => 'get postname'
}

// any file sent is a promise that returns
// filename, mimetype, encoding, createReadStream

const Mutation = {
    createPost: async (_, { input: { image } }, {User, Post}) => {
        const { createReadStream } = await image;
        console.log(image)
        return "the string"
    }
}

export default {
    Query,
    Mutation
}