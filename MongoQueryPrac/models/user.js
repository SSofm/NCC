
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        first_name: String,
        last_name: String,
        full_name : { 
            first : String,
            last : String
        }
    },
    {
        collection: 'users'
    }
)

const userModel = mongoose.model('user', userSchema)
export {userModel}