import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: { type: String },
    seen: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

export default mongoose.model('Message', messageSchema);