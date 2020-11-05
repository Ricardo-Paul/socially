import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment:{
        type: String,
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
    "versionKey": "_vKey"
});

export default mongoose.model('Comment', CommentSchema);