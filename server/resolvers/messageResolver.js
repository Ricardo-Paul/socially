const Query = {

}

const Mutation = {
    createMessage: async (root, { input: { message, sender, receiver } }, {Message, User}) => {

    },
    deleteMessage: async (root, { input: { messageId } }, { Message, User }) => {

    }
}

export default {
    Query,
    Mutation
}