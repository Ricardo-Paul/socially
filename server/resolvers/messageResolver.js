import mongoose from "mongoose";
import { pubSub } from "../utils/apolloServer";
import { withFilter } from "apollo-server";
import { MESSAGE_CREATED, NEW_CONVERSATION } from "../constants/Subscriptions";


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
        const authUser = await User.findById(authUserId).populate('messages', 'id fullName image username isOnline')

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
        // attach message properties to users who had a chat with the auth user
        // based on if they are sender or receiver
       authUser.messages.map((u) => {
        // each person who messaged the auth user
        const user = {
            id: u.id,
            fullName: u.fullName,
            image: u.image,
            username: u.username,
            isOnline: u.isOnline
        };

        // check if the person is the sender in the auth user last Messages
        const sender = lastMessages.find((m) => m.sender.toString() === u.id); //returns a message
        if(sender){
            user.seen = sender.seen; //(message.seen --> default value is false)
            user.lastMessage = sender.message; // the actual message sent by the user
            user.lastMessageCreatedAt = sender.createdAt;
            user.lastMessageSender = false; // if the use sent the message, he's not the last message sender (not the one having to send the next message)
        };

        // check if the user is the receiver in the auth user last messages
        const receiver = lastMessages.find((m) => m.receiver.toString() === u.id); // returns a message
        if(receiver){
            user.seen = receiver.seen;
            user.lastMessage = receiver.message; //the actual message received by the user
            user.lastMessageCreatedAt = receiver.createdAt;
            user.lastMessageSender = true // if the user received a message, he's the last message sender
        };

        conversations.push(user);
       })

      const sortedConversations = conversations.sort((a, b) => {
        b.lastMessageCreatedAt.toString().localeCompare(a.lastMessageCreatedAt)
      });

       return sortedConversations;
    }
}

const Mutation = {
    createMessage: async (root, { input: { message, sender, receiver } }, {Message, User}) => {

        const newMessage = await new Message({
            sender: sender,
            receiver: receiver,
            message: message
        }).save();

        // populate because we'll need sender and receiver id
        newMessage = await newMessage.populate('sender').populate('receiver').execPopulate();
        pubSub.publish(MESSAGE_CREATED, {
            messageCreated: newMessage
        })

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

const Subscription = {
    messageCreated: {
        subscribe: withFilter( () => pubSub.asyncIterator(MESSAGE_CREATED),
        (payload, variables) => {
            const { sender, receiver } = payload.messageCreated;
            const { authUserId, userId } = variables;

            const isAuthUserSenderOrReceiver = authUserId === sender.id || authUserId == receiver.id
            const isUserSenderOrReceiver = userId === sender.id || userId === receiver.id

            return isAuthUserSenderOrReceiver && isUserSenderOrReceiver
        }
        )
    },
    newConversation: {
        subscribe: pubSub.asyncIterator(NEW_CONVERSATION)
    }
}

export default {
    Query,
    Mutation,
    Subscription
}