import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true,
    versionKey: 'vKey'
})

export default mongoose.model('Post', postSchema);