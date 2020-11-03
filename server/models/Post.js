import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    // image will be an object resolved from a promise
    // {createReadStream, filename, mimetype, encoding}
    // handled in schema
    image: String,
    imagePublicId: String,
    author: {
        type: Schema.Types.ObjectId, //stored in author._id
        ref: 'User'
    }
},{
    timestamps: true,
    versionKey: 'vKey'
})

export default mongoose.model('Post', postSchema);