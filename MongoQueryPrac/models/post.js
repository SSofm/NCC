import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        username : String,
        title : String,
        body : String
    },
    {
        collection: 'posts'
    }
)

const postModel = mongoose.model('post', postSchema)
export {postModel}