import mongoose from 'mongoose';
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // has no reference to post
    // thus in the schema -- post: ID! and not post: Post
    post: Schema.Types.ObjectId,
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    like: {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
    follow: {
      type: Schema.Types.ObjectId,
      ref: "Follow"
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * notification has a notificationType field
 * that is dynamic - it can be
 * COMMENT/LIKE/FOLLOW
 */


export default mongoose.model('Notification', notificationSchema);
