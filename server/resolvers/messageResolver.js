const Query = {

}

const Mutation = {
    createMessage: async (root, { input: { message, sender, receiver } }, {Message, User}) => {
        const newMessage = await new Message({
            sender: sender,
            receiver: receiver,
            message: message
        }).save();

        // push sender to receiver messages collection
        // push receiver to sender messages collection
        
    },
    deleteMessage: async (root, { input: { messageId } }, { Message, User }) => {

    }
}

export default {
    Query,
    Mutation
}