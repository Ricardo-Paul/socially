import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,

    image: String, //secure_url (returned by cloudinary) the actual image url
    imagePublicId: String, //image_name
    author: {
        type: Schema.Types.ObjectId, //stored in author._id
        ref: 'User'
    }
},{
    timestamps: true,
    versionKey: 'vKey'
})

export default mongoose.model('Post', postSchema);