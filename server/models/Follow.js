import mongoose from 'mongoose';
const { Schema } = mongoose;

const followSchema = new Schema(
  {
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Follow', followSchema);
