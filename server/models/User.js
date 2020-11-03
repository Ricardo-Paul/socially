import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    passwordResetTokenExpiryDate: Date, //type String in schema
    posts: [
        {type: Schema.Types.ObjectId,
         ref: "Post"
        }
    ]
},{
    timestamps: true,
    versionKey: '_vKey'
})
// we change versionKey value from __v to vKey
// a versionKey of 0 means user is just created

// we're using a pre-save hook on the document
// to hash the password whenenver it changes

// using an arrow function here would change the
// context of this
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash;
    } catch(err){
        return next(err)
    }
})

export default mongoose.model('User', userSchema);