import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // image and coverImage
    image: String,
    coverImage: String,
    imagePublicId: String,
    coverImagePublicId: String,
    // password Reset
    passwordResetToken: String,
    passwordResetTokenExpiry: String,
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true,
    versionKey: '_vKey'
})

export default mongoose.model('User', userSchema);