import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * current user is following the follower
 */
const followSchema = new Schema(
  {
    following: { // the actual user
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    follower: { //
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Follow', followSchema);
