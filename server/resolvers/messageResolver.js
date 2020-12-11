import mongoose from "mongoose";

const Query = {
    getMessages: async (root, {authUserId, userId}, {Message}) => {
        const query = {
            $and:[
                { $or:[{sender: authUserId } , {receiver: authUserId}] },
                { $or: [{sender: userId}, { receiver: userId }] }
            ]
        }
        const messages = await Message.find(query);
        // SHOULD POPULATE??

        return messages;
    },
    getConversations: async (root, { authUserId }, {User, Message}) => {
        // a message is represented by the senderId
        // populating the messages field returns the entire sender
        const authUser = await User.findById(authUserId).populate('messages')


        console.log('AUTH USER',authUser);

        // messages the auth user has sent or received
       const lastMessages = await Message.aggregate([
           {$match:{
            $or:[
                {receiver: mongoose.Types.ObjectId(authUserId) },
                {sender: mongoose.Types.ObjectId(authUserId)}
            ]
           }},
           {$sort:{ createdAt: -1 }} //TODO: add other aggregation stages
       ]);

       let conversations = [];
       authUser.messages.map((message) => {
        console.log('SINGLE MESSAGE', message, 'FINISH')
       })
      

       return [authUser];
    }
}

const Mutation = {
    createMessage: async (root, { input: { message, sender, receiver } }, {Message, User}) => {
        console.log('FUNC HIT');


        const newMessage = await new Message({
            sender: sender,
            receiver: receiver,
            message: message
        }).save();

        // TODO: populate message before publish through subscription

        // push sender to receiver messages collection
        // push receiver to sender messages collection
        // if it is the first conversation

        const senderUser = await User.findById(sender);

        if(!senderUser.messages.includes(receiver)){
            await User.findOneAndUpdate({ _id: receiver }, { $push: { messages: sender } });
            await User.findOneAndUpdate({ _id: sender }, { $push: { messages: receiver } })

            newMessage.isFirstMessage = true;
        }

        return newMessage;
    },
    deleteMessage: async (root, { input: { messageId } }, { Message, User }) => {
        const message = await Message.findOneAndRemove({ _id: messageId });
        // remove the message only from the sender messages array
        await User.findOneAndUpdate({ _id: message.sender }, { $pull: { messages: message.receiver } });

        return message;
    }
}

export default {
    Query,
    Mutation
}