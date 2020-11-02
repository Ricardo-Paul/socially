
const Query = {
    postname: () => 'get postname'
}

// any file sent is a promise that returns
// filename, mimetype, encoding, createReadStream

const Mutation = {
    createPost: async (_, { image }, {User, Post}) => {
        let f = await image
        console.log(image)
        return "the string"
    }
}

export default {
    Query,
    Mutation
}