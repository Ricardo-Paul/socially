
const Query = {
    postname: () => 'get postname'
}

const Mutation = {
    createPost: async (_, {input: {title}}, {User, Post}) => {
        let t = title
        console.log(t)
        return{
            title: 'testing args'
        }
    }
}

export default {
    Query,
    Mutation
}