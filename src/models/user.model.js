import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "content"
        }
    ],
refreshToken: {
    type: String,
    
},

    
   }

)

// userSchema.pre("save", async function (next) {
//     this.password = bcrypt.hash(this.password, 10)
//     next()
// })

export const User = mongoose.model("User", userSchema)
