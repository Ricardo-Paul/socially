import mongoose from 'mongoose';
const { Schema } = mongoose;

const likeSchma = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: '_vKey',
  }
);

export default mongoose.model('Like', likeSchma);
