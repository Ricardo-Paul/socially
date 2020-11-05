import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model('Comment', CommentSchema);