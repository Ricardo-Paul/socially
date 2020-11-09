import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: String,

    image: String, //secure_url (returned by cloudinary) the actual image url
    imagePublicId: String, //image_name
    author: {
      type: Schema.Types.ObjectId, //stored in author._id
      ref: 'User',
    },

    // a post has many comments
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    // a post has many likes
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: '_vKey',
  }
);

export default mongoose.model('Post', postSchema);
